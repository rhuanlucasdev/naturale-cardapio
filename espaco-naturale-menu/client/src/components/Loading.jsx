export default function Loading({ label = "Carregando..." }) {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-3xl border border-naturale-beige bg-white/70 p-8 text-naturale-green-dark">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-naturale-green border-t-transparent" />
      <span className="ml-3 text-sm font-bold">{label}</span>
    </div>
  );
}
