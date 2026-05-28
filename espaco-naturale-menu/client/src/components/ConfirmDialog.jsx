import { AlertTriangle, Loader2, X } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Remover",
  cancelLabel = "Cancelar",
  loading,
  onCancel,
  onConfirm
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-naturale-text/45 px-4 py-6 backdrop-blur-sm">
      <section
        className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl shadow-black/20"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <div className="flex items-start justify-between gap-4 bg-red-50 px-5 py-4">
          <div className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-100 text-red-700">
              <AlertTriangle size={23} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-red-700/70">Confirmacao</p>
              <h2 id="confirm-dialog-title" className="mt-1 text-xl font-black leading-tight text-red-950">
                {title}
              </h2>
            </div>
          </div>
          <button
            className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-red-800 hover:bg-red-100"
            type="button"
            onClick={onCancel}
            aria-label="Fechar"
            disabled={loading}
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm font-semibold leading-6 text-naturale-text/70">{message}</p>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              className="focus-ring rounded-2xl border border-naturale-beige bg-white px-4 py-3 text-sm font-black text-naturale-green-dark hover:bg-naturale-cream disabled:opacity-60"
              type="button"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelLabel}
            </button>
            <button
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-700/15 hover:bg-red-800 disabled:opacity-60"
              type="button"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" size={17} aria-hidden="true" />}
              {confirmLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
