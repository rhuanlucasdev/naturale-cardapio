import { useCallback, useEffect, useMemo, useState } from "react";
import { ChefHat, CircleOff, Layers3, Star } from "lucide-react";
import AdminLayout from "../components/AdminLayout.jsx";
import CategoryManager from "../components/CategoryManager.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Loading from "../components/Loading.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";
import { api } from "../services/api.js";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(null);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      available: products.filter((product) => product.available).length,
      featured: products.filter((product) => product.featured).length,
      categories: categories.length
    };
  }, [products, categories]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [productsData, categoriesData] = await Promise.all([api.getProducts(), api.getCategories()]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function runAction(action, successMessage) {
    try {
      setSaving(true);
      setError("");
      await action();
      setNotice(successMessage);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      window.setTimeout(() => setNotice(""), 2500);
    }
  }

  async function handleProductSubmit(data) {
    await runAction(
      async () => {
        if (editingProduct) {
          await api.updateProduct(editingProduct.id, data);
          setEditingProduct(null);
        } else {
          await api.createProduct(data);
        }
      },
      "Produto salvo."
    );
  }

  async function handleDeleteProduct(id) {
    const product = products.find((item) => item.id === id);

    setConfirmDialog({
      type: "product",
      id,
      title: "Remover produto?",
      message: `O item "${product?.name || "selecionado"}" sera removido do cardapio. Esta acao nao pode ser desfeita.`
    });
  }

  async function handleDeleteCategory(id) {
    const category = categories.find((item) => item.id === id);

    setConfirmDialog({
      type: "category",
      id,
      title: "Remover categoria?",
      message: `A categoria "${category?.name || "selecionada"}" sera removida junto com os produtos vinculados a ela.`
    });
  }

  async function confirmDelete() {
    if (!confirmDialog) return;

    const dialog = confirmDialog;
    await runAction(
      async () => {
        if (dialog.type === "product") {
          await api.deleteProduct(dialog.id);
        } else {
          await api.deleteCategory(dialog.id);
        }
      },
      dialog.type === "product" ? "Produto removido." : "Categoria removida."
    );
    setConfirmDialog(null);
  }

  return (
    <AdminLayout>
      <section className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={ChefHat} label="Produtos" value={stats.total} />
          <StatCard icon={Layers3} label="Categorias" value={stats.categories} />
          <StatCard icon={Star} label="Pratos do dia" value={stats.featured} warm />
          <StatCard icon={CircleOff} label="Indisponiveis" value={stats.total - stats.available} muted />
        </div>

        {(error || notice) && (
          <div
            className={`rounded-3xl border px-4 py-3 text-sm font-black shadow-sm ${
              error ? "border-red-100 bg-red-50 text-red-700" : "border-naturale-green/10 bg-white text-naturale-green-dark"
            }`}
            role="status"
          >
            {error || notice}
          </div>
        )}

        {loading ? (
          <Loading label="Carregando painel..." />
        ) : products.length ? (
          <ProductTable
            products={sortedProducts}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
            onToggleAvailability={(id) => runAction(() => api.toggleAvailability(id), "Disponibilidade atualizada.")}
            onToggleFeatured={(id) => runAction(() => api.toggleFeatured(id), "Prato do dia atualizado.")}
          />
        ) : (
          <EmptyState title="Nenhum produto cadastrado" message="Crie o primeiro item usando o formulario." />
        )}
      </section>

      <aside className="space-y-5">
        <ProductForm
          categories={categories}
          editingProduct={editingProduct}
          saving={saving}
          onCancel={() => setEditingProduct(null)}
          onSubmit={handleProductSubmit}
        />
        <CategoryManager
          categories={categories}
          saving={saving}
          onCreate={(data) => runAction(() => api.createCategory(data), "Categoria criada.")}
          onUpdate={(id, data) => runAction(() => api.updateCategory(id, data), "Categoria atualizada.")}
          onDelete={handleDeleteCategory}
        />
      </aside>

      <ConfirmDialog
        open={Boolean(confirmDialog)}
        title={confirmDialog?.title}
        message={confirmDialog?.message}
        loading={saving}
        confirmLabel="Remover"
        onCancel={() => setConfirmDialog(null)}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
}

function StatCard({ icon: Icon, label, value, warm, muted }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/82 p-4 shadow-lg shadow-naturale-green-dark/5 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-naturale-green-dark/58">{label}</p>
          <strong className="mt-1 block text-3xl font-black text-naturale-text">{value}</strong>
        </div>
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl ${
            warm
              ? "bg-naturale-warm/12 text-naturale-warm"
              : muted
                ? "bg-stone-200 text-stone-600"
                : "bg-naturale-green/12 text-naturale-green-dark"
          }`}
        >
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
