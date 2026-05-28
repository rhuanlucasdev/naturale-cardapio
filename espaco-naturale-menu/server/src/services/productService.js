import prisma from "../prisma.js";
import { AppError } from "../utils/AppError.js";

const productInclude = {
  category: true
};

export async function listProducts() {
  return prisma.product.findMany({
    include: productInclude,
    orderBy: [{ category: { order: "asc" } }, { name: "asc" }]
  });
}

export async function listFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true, available: true },
    include: productInclude,
    orderBy: { name: "asc" }
  });
}

export async function createProduct(data) {
  validateProductPayload(data);
  await ensureCategoryExists(data.categoryId);

  return prisma.product.create({
    data: normalizeProductPayload(data),
    include: productInclude
  });
}

export async function updateProduct(id, data) {
  validateProductPayload(data);
  await ensureProductExists(id);
  await ensureCategoryExists(data.categoryId);

  return prisma.product.update({
    where: { id },
    data: normalizeProductPayload(data),
    include: productInclude
  });
}

export async function toggleAvailability(id) {
  const product = await ensureProductExists(id);

  return prisma.product.update({
    where: { id },
    data: { available: !product.available },
    include: productInclude
  });
}

export async function toggleFeatured(id) {
  const product = await ensureProductExists(id);

  return prisma.product.update({
    where: { id },
    data: { featured: !product.featured },
    include: productInclude
  });
}

export async function deleteProduct(id) {
  await ensureProductExists(id);
  await prisma.product.delete({ where: { id } });
}

function validateProductPayload(data) {
  if (!data.name || !data.description || !data.categoryId) {
    throw new AppError("Nome, descricao e categoria sao obrigatorios.");
  }

  const price = parsePrice(data.price);

  if (Number.isNaN(price) || price < 0) {
    throw new AppError("Preco invalido.");
  }
}

function normalizeProductPayload(data) {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    price: parsePrice(data.price),
    imageUrl: data.imageUrl?.trim() || null,
    available: Boolean(data.available),
    featured: Boolean(data.featured),
    categoryId: data.categoryId
  };
}

function parsePrice(value) {
  if (typeof value === "number") {
    return value;
  }

  return Number(String(value).replace(",", "."));
}

async function ensureProductExists(id) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new AppError("Produto nao encontrado.", 404);
  }

  return product;
}

async function ensureCategoryExists(id) {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    throw new AppError("Categoria nao encontrada.", 404);
  }
}
