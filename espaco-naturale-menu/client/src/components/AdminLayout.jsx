import { ArrowLeft, Leaf, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth.js";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/admin/login");
  }

  return (
    <div className="admin-surface min-h-screen">
      <header className="bg-naturale-green-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-2">
                <Link
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-white/82 hover:bg-white/16"
                  to="/"
                >
                  <ArrowLeft size={15} aria-hidden="true" />
                  Cardapio
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-naturale-green-dark shadow-lg shadow-black/10">
                  <Leaf size={24} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="brand-script text-4xl leading-none text-white">Naturale</p>
                  <h1 className="mt-1 text-xl font-black leading-tight text-white sm:text-2xl">
                    Painel administrativo
                  </h1>
                </div>
              </div>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-white/68">
                Gerencie produtos, categorias, disponibilidade e pratos do dia do cardapio digital.
              </p>
            </div>
            <button
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white hover:bg-white/16"
              type="button"
              onClick={handleLogout}
            >
              <LogOut size={17} aria-hidden="true" />
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        {children}
      </main>
    </div>
  );
}
