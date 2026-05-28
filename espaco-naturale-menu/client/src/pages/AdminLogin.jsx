import { ArrowLeft, KeyRound, Leaf, Loader2, LockKeyhole, LogIn, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api.js";
import { saveToken } from "../utils/auth.js";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.login(password);
      saveToken(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <section className="menu-shell w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70">
        <div className="bg-naturale-green-dark px-6 py-5 text-white">
          <Link
            className="focus-ring mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.1em] text-white/86 hover:bg-white/16"
            to="/"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Cardapio
          </Link>

          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-naturale-green-dark">
                  <Leaf size={23} aria-hidden="true" />
                </span>
                <span className="brand-script text-4xl leading-none">Naturale</span>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-naturale-beige">
                Area administrativa
              </p>
              <h1 className="mt-2 text-3xl font-black leading-tight">Entrar no painel</h1>
            </div>
            <ShieldCheck className="mb-1 shrink-0 text-naturale-beige" size={34} aria-hidden="true" />
          </div>
        </div>

        <form className="space-y-5 px-6 py-6" onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-naturale-beige/70 bg-white/68 px-4 py-3">
            <p className="flex gap-2 text-sm font-semibold leading-6 text-naturale-text/70">
              <LockKeyhole className="mt-0.5 shrink-0 text-naturale-warm" size={17} aria-hidden="true" />
              Use a senha definida no servidor para gerenciar produtos e categorias.
            </p>
          </div>

          <label className="block space-y-2">
            <span className="label">Senha</span>
            <span className="relative block">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-naturale-green-dark/45" size={18} aria-hidden="true" />
              <input
                className="field h-13 rounded-2xl !pl-12 font-semibold"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Digite a senha admin"
                required
              />
            </span>
          </label>

          {error && (
            <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            className="focus-ring inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-naturale-green-dark px-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-naturale-green-dark/20 transition hover:-translate-y-0.5 hover:bg-naturale-green disabled:translate-y-0 disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <LogIn size={18} aria-hidden="true" />}
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
