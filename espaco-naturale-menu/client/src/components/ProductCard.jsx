import { Ban, Star } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency.js";

export default function ProductCard({ product }) {
  return (
    <article
      className={`menu-card flex gap-3 rounded-3xl border p-2.5 ${
        product.available ? "border-white/80" : "border-stone-300 opacity-70 grayscale"
      }`}
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.25rem] bg-naturale-beige sm:h-28 sm:w-28">
        {product.imageUrl ? (
          <img className="h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="grid h-full w-full place-items-center bg-naturale-green/15 text-naturale-green-dark">
            <span className="text-xs font-black uppercase">Naturale</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-naturale-warm text-white shadow-md">
            <Star size={14} fill="currentColor" aria-label="Prato do dia" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 py-1 pr-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[1.05rem] font-black leading-tight text-black sm:text-lg">{product.name}</h3>
            <p className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.08em] text-naturale-green-dark/68">
              {product.category?.name}
            </p>
          </div>
          <strong className="shrink-0 rounded-2xl bg-naturale-green-dark px-2.5 py-1.5 text-sm font-black leading-none text-white shadow-sm sm:text-base">
            {formatCurrency(product.price)}
          </strong>
        </div>

        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-black/64">{product.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.available ? (
            <span className="rounded-full bg-naturale-green/12 px-2.5 py-1 text-xs font-black text-naturale-green-dark">
              Disponivel
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-200 px-2.5 py-1 text-xs font-black text-stone-700">
              <Ban size={13} aria-hidden="true" />
              Indisponivel
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
