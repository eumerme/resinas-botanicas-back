import { PrismaClient } from "@prisma/client";
import { data } from "./data";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  const categories = await prisma.category.createMany({
    data: data.categories,
  });

  const products = await prisma.product.createMany({
    data: data.products,
  });

  console.log({ categories, products });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
