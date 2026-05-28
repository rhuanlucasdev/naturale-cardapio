import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Pratos", order: 1 },
  { name: "Lanches", order: 2 },
  { name: "Bebidas", order: 3 },
  { name: "Sucos", order: 4 },
  { name: "Sobremesas", order: 5 }
];

const products = [
  {
    name: "Prato Natural da Casa",
    description: "Arroz integral, legumes salteados, salada fresca e proteina do dia.",
    price: 29.9,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    category: "Pratos",
    featured: true
  },
  {
    name: "Sanduiche Natural de Frango",
    description: "Pao integral, frango desfiado temperado, cenoura, milho e folhas.",
    price: 18.5,
    imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80",
    category: "Lanches",
    featured: true
  },
  {
    name: "Suco Natural de Laranja",
    description: "Suco fresco de laranja, preparado na hora.",
    price: 9.9,
    imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80",
    category: "Sucos"
  },
  {
    name: "Suco Verde",
    description: "Couve, abacaxi, hortela, gengibre e limao.",
    price: 12.9,
    imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=900&q=80",
    category: "Sucos",
    featured: true
  },
  {
    name: "Bolo Caseiro",
    description: "Fatia de bolo caseiro do dia, macio e aromatico.",
    price: 10.0,
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80",
    category: "Sobremesas"
  },
  {
    name: "Salada Especial",
    description: "Mix de folhas, tomate cereja, cenoura, sementes e molho da casa.",
    price: 24.9,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    category: "Pratos"
  }
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  const createdCategories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(createdCategories.map((category) => [category.name, category.id]));

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        featured: Boolean(product.featured),
        categoryId: categoryMap[product.category]
      }
    });
  }
}

main()
  .then(async () => {
    console.log("Seed finalizado com sucesso.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
