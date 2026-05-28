import { Sprout } from "lucide-react";

export default function EmptyState({ title = "Nada por aqui ainda", message = "Tente ajustar os filtros." }) {
  return (
    <div className="rounded-3xl border border-dashed border-naturale-beige bg-white/60 p-8 text-center">
      <Sprout className="mx-auto text-naturale-green" size={34} aria-hidden="true" />
      <h3 className="mt-3 text-lg font-black text-naturale-green-dark">{title}</h3>
      <p className="mt-2 text-sm text-naturale-text/65">{message}</p>
    </div>
  );
}
