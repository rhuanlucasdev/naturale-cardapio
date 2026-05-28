export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <nav aria-label="Categorias" className="hide-scrollbar -mx-3 overflow-x-auto px-3 pb-2 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2.5">
        <button
          className={buttonClass(activeCategory === "all")}
          type="button"
          onClick={() => onChange("all")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            className={buttonClass(activeCategory === category.id)}
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}

function buttonClass(active) {
  return [
    "focus-ring rounded-full border px-4 py-2.5 text-sm font-black shadow-sm transition",
    active
      ? "border-naturale-green-dark bg-naturale-green-dark text-white"
      : "border-white/80 bg-white/72 text-naturale-green-dark hover:bg-white"
  ].join(" ");
}
