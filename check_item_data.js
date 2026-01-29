const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const item = await prisma.orderItem.findFirst();
  console.log("Sample OrderItem:", JSON.stringify(item, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
