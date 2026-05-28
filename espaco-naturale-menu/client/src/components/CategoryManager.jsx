import { Edit3, GripVertical, Layers3, ListOrdered, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function CategoryManager({ categories, onCreate, onUpdate, onDelete, saving }) {
  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);
  const [editing, setEditing] = useState(null);

  function reset() {
    setName("");
    setOrder(0);
    setEditing(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (editing) {
      await onUpdate(editing.id, { name, order });
    } else {
      await onCreate({ name, order });
    }

    reset();
  }

  function startEdit(category) {
    setEditing(category);
    setName(category.name);
    setOrder(category.order);
  }

  return (
    <section className="admin-panel space-y-4">
      <div>
        <p className="label">Organizacao</p>
        <h2 className="mt-1 text-2xl font-black text-naturale-green-dark">Categorias</h2>
        <p className="mt-1 text-sm font-semibold text-naturale-text/58">
          Agrupe o cardapio e defina a ordem de exibicao.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="label">Nome</span>
          <span className="relative block">
            <Layers3 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/42" size={18} aria-hidden="true" />
            <input className="field !pl-11" value={name} onChange={(event) => setName(event.target.value)} required />
          </span>
        </label>
        <label className="block space-y-2">
          <span className="label">Ordem</span>
          <span className="relative block">
            <ListOrdered className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/42" size={18} aria-hidden="true" />
            <input
              className="field !pl-11"
              type="number"
              value={order}
              onChange={(event) => setOrder(event.target.value)}
            />
          </span>
        </label>
        <div className="flex gap-2">
          <button
            className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-naturale-green px-4 py-3 text-sm font-black text-white shadow-lg shadow-naturale-green/15 hover:bg-naturale-green-dark disabled:opacity-60"
            type="submit"
            disabled={saving}
          >
            {editing ? <Save size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
            {editing ? "Atualizar" : "Criar"}
          </button>
          {editing && (
            <button
              className="focus-ring grid h-12 w-12 place-items-center rounded-2xl border border-naturale-beige bg-white text-naturale-green-dark"
              type="button"
              onClick={reset}
              aria-label="Cancelar edicao"
            >
              <X size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/75 bg-white/86 p-3 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-naturale-green/10 text-naturale-green-dark">
                <GripVertical size={16} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <strong className="block truncate text-sm font-black text-naturale-text">{category.name}</strong>
                <span className="text-xs text-naturale-text/58">
                  Ordem {category.order} · {category._count?.products || 0} produtos
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="focus-ring grid h-9 w-9 place-items-center rounded-xl border border-naturale-beige bg-naturale-cream text-naturale-green-dark"
                type="button"
                onClick={() => startEdit(category)}
                aria-label={`Editar ${category.name}`}
              >
                <Edit3 size={15} aria-hidden="true" />
              </button>
              <button
                className="focus-ring grid h-9 w-9 place-items-center rounded-xl border border-red-200 bg-red-50 text-red-700"
                type="button"
                onClick={() => onDelete(category.id)}
                aria-label={`Remover ${category.name}`}
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
