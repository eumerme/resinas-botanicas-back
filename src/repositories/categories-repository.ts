import { prisma } from "../config";

export async function findMany() {
  return prisma.category.findMany();
}

export async function findById(id: number) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export const categoriesRepository = { findMany, findById };
