import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api.js";

export function useMenuData() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [productsData, featuredData, categoriesData] = await Promise.all([
        api.getProducts(),
        api.getFeaturedProducts(),
        api.getCategories()
      ]);
      setProducts(productsData);
      setFeaturedProducts(featuredData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  return { products, featuredProducts, categories, loading, error, reload: loadMenu };
}
