import { useMemo, useState } from "react";
import CategoryFilter from "../components/CategoryFilter.jsx";
import EmptyState from "../components/EmptyState.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import Header from "../components/Header.jsx";
import Loading from "../components/Loading.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useMenuData } from "../hooks/useMenuData.js";

export default function MenuPage() {
  const { products, featuredProducts, categories, loading, error } = useMenuData();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }

    return products.filter((product) => product.categoryId === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen pb-6">
      <Header />
      <FeaturedProducts products={featuredProducts} />

      <main className="menu-shell mx-3 max-w-md rounded-[1.75rem] border border-white/70 px-3 pb-5 pt-4 sm:mx-auto sm:max-w-3xl sm:px-4">
        <div className="sticky top-2 z-20 -mx-1 mb-4 rounded-[1.5rem] border border-white/70 bg-naturale-cream/86 px-1 pb-1 pt-3 shadow-lg shadow-black/10 backdrop-blur-xl">
          <div className="mb-3 flex items-end justify-between gap-3 px-3">
            <div>
              <p className="poster-title text-3xl uppercase leading-none text-black">Menu</p>
              <h2 className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-naturale-green-dark/70">
                Consulte por categoria
              </h2>
            </div>
            <span className="rounded-full bg-white/78 px-3 py-1.5 text-xs font-black text-naturale-green-dark">
              {filteredProducts.length} itens
            </span>
          </div>
          <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>

        {loading && <Loading label="Buscando cardapio..." />}
        {error && (
          <EmptyState
            title="Nao foi possivel carregar o cardapio"
            message="Confira se a API esta rodando e tente novamente."
          />
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <EmptyState title="Nenhum produto encontrado" message="Escolha outra categoria para continuar." />
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="flex flex-col gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
