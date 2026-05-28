import { Clock3, Leaf, MapPin, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="px-3 pt-3 sm:pt-5">
      <div className="menu-shell mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-white/70 sm:max-w-3xl">
        <div className="relative px-5 pb-5 pt-4 text-center">
          <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-naturale-green-dark via-naturale-green to-naturale-warm" />

          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-naturale-green-dark px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.1em] text-white">
              <Clock3 size={13} aria-hidden="true" />
              Hoje
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/82 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.1em] text-naturale-green-dark">
              <Sparkles size={13} aria-hidden="true" />
              No local
            </span>
          </div>

          <div className="mx-auto mt-5 flex w-fit items-center justify-center gap-2">
            <h1 className="brand-script text-5xl leading-none text-black sm:text-6xl">
              Naturale
            </h1>
            <Leaf className="mt-1 text-naturale-green-dark" size={30} aria-hidden="true" />
          </div>

          <div className="mx-auto mt-3 h-px w-36 bg-gradient-to-r from-transparent via-naturale-green-dark/55 to-transparent" />

          <p className="poster-title mt-3 text-4xl uppercase leading-none text-black sm:text-5xl">
            Cardapio do dia
          </p>

          <p className="mx-auto mt-4 max-w-sm text-sm font-black leading-6 text-black/72">
            Escolha olhando com calma. Este cardapio e apenas para consulta dentro do restaurante.
          </p>

          <div className="mt-4 rounded-2xl border border-naturale-beige/70 bg-white/72 px-4 py-3">
            <p className="flex items-center justify-center gap-2 text-xs font-black leading-5 text-naturale-green-dark">
              <MapPin className="shrink-0 text-naturale-warm" size={15} aria-hidden="true" />
              Rua Bueno de Paiva, 315 - Paraisopolis/MG
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
