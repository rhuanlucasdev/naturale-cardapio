import * as productService from "../services/productService.js";

export async function index(request, response) {
  const products = await productService.listProducts();
  return response.json(products);
}

export async function featured(request, response) {
  const products = await productService.listFeaturedProducts();
  return response.json(products);
}

export async function create(request, response) {
  const product = await productService.createProduct(request.body);
  return response.status(201).json(product);
}

export async function update(request, response) {
  const product = await productService.updateProduct(request.params.id, request.body);
  return response.json(product);
}

export async function availability(request, response) {
  const product = await productService.toggleAvailability(request.params.id);
  return response.json(product);
}

export async function toggleFeatured(request, response) {
  const product = await productService.toggleFeatured(request.params.id);
  return response.json(product);
}

export async function remove(request, response) {
  await productService.deleteProduct(request.params.id);
  return response.status(204).send();
}
