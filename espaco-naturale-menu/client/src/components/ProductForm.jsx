import { BadgeDollarSign, Image, Layers3, Save, Soup, Star, ToggleRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  categoryId: "",
  available: true,
  featured: false
};

export default function ProductForm({ categories, editingProduct, onCancel, onSubmit, saving }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        imageUrl: editingProduct.imageUrl || "",
        categoryId: editingProduct.categoryId,
        available: editingProduct.available,
        featured: editingProduct.featured
      });
      return;
    }

    setForm((current) => ({ ...emptyForm, categoryId: current.categoryId || categories[0]?.id || "" }));
  }, [editingProduct, categories]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="admin-panel space-y-4" onSubmit={handleSubmit}>
      <div>
        <p className="label">Produtos</p>
        <h2 className="mt-1 text-2xl font-black text-naturale-green-dark">
          {editingProduct ? "Editar produto" : "Novo produto"}
        </h2>
        <p className="mt-1 text-sm font-semibold text-naturale-text/58">
          {editingProduct ? "Atualize as informacoes do item selecionado." : "Cadastre um item para aparecer no cardapio."}
        </p>
      </div>

      <label className="block space-y-2">
        <span className="label">Nome</span>
        <span className="relative block">
          <Soup className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/42" size={18} aria-hidden="true" />
          <input className="field !pl-11" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
        </span>
      </label>

      <label className="block space-y-2">
        <span className="label">Descricao</span>
        <textarea
          className="field min-h-28 resize-y"
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <label className="block space-y-2">
          <span className="label">Preco</span>
          <span className="relative block">
            <BadgeDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/42" size={18} aria-hidden="true" />
            <input
              className="field !pl-11"
              type="text"
              inputMode="decimal"
              placeholder="Ex: 24,90"
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
              required
            />
          </span>
        </label>

        <label className="block space-y-2">
          <span className="label">Categoria</span>
          <span className="relative block">
            <Layers3 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/42" size={18} aria-hidden="true" />
            <select
              className="field !pl-11"
              value={form.categoryId}
              onChange={(event) => updateField("categoryId", event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <label className="block space-y-2">
        <span className="label">Imagem URL</span>
        <span className="relative block">
          <Image className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/42" size={18} aria-hidden="true" />
          <input
            className="field !pl-11"
            type="url"
            placeholder="https://..."
            value={form.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
          />
        </span>
      </label>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <label className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 text-sm font-black text-naturale-green-dark shadow-sm">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(event) => updateField("available", event.target.checked)}
          />
          <ToggleRight size={18} aria-hidden="true" />
          Disponivel
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 text-sm font-black text-naturale-green-dark shadow-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => updateField("featured", event.target.checked)}
          />
          <Star size={18} aria-hidden="true" />
          Prato do dia
        </label>
      </div>

      <div className="flex gap-2">
        <button
          className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-naturale-green-dark px-4 py-3 text-sm font-black text-white shadow-lg shadow-naturale-green-dark/15 hover:bg-naturale-green disabled:opacity-60"
          type="submit"
          disabled={saving}
        >
          <Save size={17} aria-hidden="true" />
          {saving ? "Salvando..." : "Salvar"}
        </button>
        {editingProduct && (
          <button
            className="focus-ring inline-flex items-center justify-center rounded-2xl border border-naturale-beige bg-white px-4 py-3 text-naturale-green-dark hover:bg-naturale-cream"
            type="button"
            onClick={onCancel}
            aria-label="Cancelar edicao"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
