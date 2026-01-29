const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: { category: true },
    take: 20,
  });
  const categories = [...new Set(products.map((p) => p.category))];
  console.log("Unique categories in DB:", JSON.stringify(categories));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
