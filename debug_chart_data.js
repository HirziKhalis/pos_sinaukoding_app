const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { startOfDay, endOfDay, subDays, format } = require("date-fns");

async function main() {
  console.log("--- DEBUGGING DASHBOARD STATS ---");

  const now = new Date();
  const startDate = startOfDay(subDays(now, 10));
  const endDate = endOfDay(now);

  console.log(`Range: ${startDate.toISOString()} to ${endDate.toISOString()}`);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      items: {
        include: {
          product: {
            select: { name: true, category: true },
          },
        },
      },
    },
  });

  console.log(`Found ${orders.length} orders in range.`);

  if (orders.length > 0) {
    orders.forEach((o) => {
      console.log(
        `Order ${o.orderNumber}: Total=${o.total}, CreatedAt=${o.createdAt.toISOString()}`,
      );
      o.items.forEach((i) => {
        console.log(
          `  - Item: ${i.product.name}, Cat: ${i.product.category}, Price: ${i.price}, Qty: ${i.quantity}`,
        );
      });
    });
  } else {
    console.log("NO ORDERS FOUND FOR THIS RANGE.");
    const allOrders = await prisma.order.findMany({ take: 5 });
    console.log("Sample of all orders in DB:");
    allOrders.forEach((o) =>
      console.log(`- ${o.orderNumber}: ${o.createdAt.toISOString()}`),
    );
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
