import { prisma } from "../config";

export async function findMany() {
  return prisma.category.findMany();
}

export async function findById(id: number) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export async function findProductsByCategoryId(id: number) {
  return prisma.category.findFirst({
    where: { id },
    include: { product: true },
  });
}
