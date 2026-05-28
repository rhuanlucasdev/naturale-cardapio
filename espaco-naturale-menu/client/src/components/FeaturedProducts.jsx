import ProductCard from "./ProductCard.jsx";

export default function FeaturedProducts({ products }) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-md px-3 py-4 sm:max-w-3xl sm:px-4" aria-labelledby="featured-title">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/72">Escolhas de hoje</p>
          <h2 className="poster-title text-3xl uppercase leading-none text-white drop-shadow" id="featured-title">
            Pratos do dia
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
