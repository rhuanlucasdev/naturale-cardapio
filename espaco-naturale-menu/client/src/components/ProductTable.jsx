import { Edit3, ImageOff, Sparkles, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency.js";

export default function ProductTable({ products, onEdit, onDelete, onToggleAvailability, onToggleFeatured }) {
  return (
    <section className="admin-panel overflow-hidden">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label">Cardapio</p>
          <h2 className="mt-1 text-2xl font-black text-naturale-green-dark">Produtos cadastrados</h2>
        </div>
        <span className="w-fit rounded-full bg-naturale-green/10 px-3 py-1 text-sm font-black text-naturale-green-dark">
          {products.length} itens
        </span>
      </div>

      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <ProductMobileCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleAvailability={onToggleAvailability}
            onToggleFeatured={onToggleFeatured}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <table className="w-full table-fixed border-separate border-spacing-y-2 text-left text-sm">
          <colgroup>
            <col className="w-[38%]" />
            <col className="w-[15%]" />
            <col className="w-[13%]" />
            <col className="w-[17%]" />
            <col className="w-[17%]" />
          </colgroup>
          <thead>
            <tr className="text-xs uppercase tracking-[0.12em] text-naturale-green-dark/55">
              <th className="px-2 py-2">Produto</th>
              <th className="px-2 py-2">Categoria</th>
              <th className="px-2 py-2">Preco</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2 text-right">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white/92 shadow-sm transition hover:bg-white">
                <td className="rounded-l-2xl px-2 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <ProductThumb product={product} />
                    <div className="min-w-0">
                      <strong className="block truncate text-naturale-text">{product.name}</strong>
                      <span className="block truncate text-xs text-naturale-text/58">{product.description}</span>
                    </div>
                  </div>
                </td>
                <td className="truncate px-2 py-3 text-naturale-text/70">{product.category?.name}</td>
                <td className="px-2 py-3 font-black text-naturale-green-dark">{formatCurrency(product.price)}</td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className={pillClass(product.available)}>
                      {product.available ? "Disponivel" : "Indisponivel"}
                    </span>
                    {product.featured && <span className="rounded-full bg-naturale-warm/10 px-2 py-1 text-xs font-black text-naturale-warm">Do dia</span>}
                  </div>
                </td>
                <td className="rounded-r-2xl px-2 py-3">
                  <div className="flex justify-end gap-1.5">
                    <IconButton label="Editar" onClick={() => onEdit(product)}>
                      <Edit3 size={16} />
                    </IconButton>
                    <IconButton label="Alternar disponibilidade" onClick={() => onToggleAvailability(product.id)}>
                      {product.available ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    </IconButton>
                    <IconButton label="Marcar como prato do dia" onClick={() => onToggleFeatured(product.id)}>
                      <Sparkles size={16} />
                    </IconButton>
                    <IconButton label="Remover" danger onClick={() => onDelete(product.id)}>
                      <Trash2 size={16} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductMobileCard({ product, onEdit, onDelete, onToggleAvailability, onToggleFeatured }) {
  return (
    <article className="rounded-3xl border border-white/75 bg-white/92 p-3 shadow-sm">
      <div className="flex gap-3">
        <ProductThumb product={product} large />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-black leading-tight text-naturale-text">{product.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-naturale-green-dark/58">
                {product.category?.name}
              </p>
            </div>
            <strong className="shrink-0 rounded-2xl bg-naturale-green-dark px-2.5 py-1.5 text-xs font-black text-white">
              {formatCurrency(product.price)}
            </strong>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-naturale-text/62">{product.description}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className={pillClass(product.available)}>{product.available ? "Disponivel" : "Indisponivel"}</span>
          {product.featured && (
            <span className="rounded-full bg-naturale-warm/10 px-2.5 py-1 text-xs font-black text-naturale-warm">
              Do dia
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <IconButton label="Editar" onClick={() => onEdit(product)}>
            <Edit3 size={16} />
          </IconButton>
          <IconButton label="Alternar disponibilidade" onClick={() => onToggleAvailability(product.id)}>
            {product.available ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </IconButton>
          <IconButton label="Marcar como prato do dia" onClick={() => onToggleFeatured(product.id)}>
            <Sparkles size={16} />
          </IconButton>
          <IconButton label="Remover" danger onClick={() => onDelete(product.id)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      </div>
    </article>
  );
}

function ProductThumb({ product, large }) {
  const size = large ? "h-20 w-20" : "h-12 w-12";

  return (
    <div className={`${size} grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-naturale-cream text-naturale-green-dark`}>
      {product.imageUrl ? (
        <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
      ) : (
        <ImageOff size={large ? 22 : 17} aria-hidden="true" />
      )}
    </div>
  );
}

function IconButton({ children, label, danger, onClick }) {
  return (
    <button
      className={`focus-ring grid h-8 w-8 place-items-center rounded-full border transition ${
        danger
          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-naturale-beige bg-naturale-cream text-naturale-green-dark hover:bg-white"
      }`}
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function pillClass(available) {
  return [
    "rounded-full px-2.5 py-1 text-xs font-black",
    available ? "bg-naturale-green/10 text-naturale-green-dark" : "bg-stone-200 text-stone-700"
  ].join(" ");
}
