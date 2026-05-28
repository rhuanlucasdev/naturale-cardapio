import * as categoryService from "../services/categoryService.js";

export async function index(request, response) {
  const categories = await categoryService.listCategories();
  return response.json(categories);
}

export async function create(request, response) {
  const category = await categoryService.createCategory(request.body);
  return response.status(201).json(category);
}

export async function update(request, response) {
  const category = await categoryService.updateCategory(request.params.id, request.body);
  return response.json(category);
}

export async function remove(request, response) {
  await categoryService.deleteCategory(request.params.id);
  return response.status(204).send();
}
