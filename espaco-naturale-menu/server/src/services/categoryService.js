import prisma from "../prisma.js";
import { AppError } from "../utils/AppError.js";

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
}

export async function createCategory(data) {
  validateCategoryPayload(data);

  return prisma.category.create({
    data: {
      name: data.name.trim(),
      order: Number(data.order) || 0
    }
  });
}

export async function updateCategory(id, data) {
  validateCategoryPayload(data);
  await ensureCategoryExists(id);

  return prisma.category.update({
    where: { id },
    data: {
      name: data.name.trim(),
      order: Number(data.order) || 0
    }
  });
}

export async function deleteCategory(id) {
  await ensureCategoryExists(id);
  await prisma.category.delete({ where: { id } });
}

function validateCategoryPayload(data) {
  if (!data.name?.trim()) {
    throw new AppError("Nome da categoria e obrigatorio.");
  }
}

async function ensureCategoryExists(id) {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    throw new AppError("Categoria nao encontrada.", 404);
  }
}
