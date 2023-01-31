import { prisma } from "../src/config";

export async function cleanDb() {
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
}
