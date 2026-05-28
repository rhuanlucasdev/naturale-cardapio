import { getToken } from "../utils/auth.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api";

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Nao foi possivel completar a solicitacao.");
  }

  return data;
}

export const api = {
  login: (password) => request("/auth/login", { method: "POST", body: JSON.stringify({ password }) }),
  me: () => request("/auth/me"),
  getProducts: () => request("/products"),
  getFeaturedProducts: () => request("/products/featured"),
  createProduct: (data) => request("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),
  toggleAvailability: (id) => request(`/products/${id}/availability`, { method: "PATCH" }),
  toggleFeatured: (id) => request(`/products/${id}/featured`, { method: "PATCH" }),
  getCategories: () => request("/categories"),
  createCategory: (data) => request("/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id, data) => request(`/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: "DELETE" })
};
