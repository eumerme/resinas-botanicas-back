import { category } from "@prisma/client";
import { prisma } from "../config";

export async function findMany(): Promise<category[]> {
  return prisma.category.findMany();
}

export async function findByName(name: string): Promise<category> {
  return prisma.category.findUnique({
    where: { name },
  });
}

export const categoriesRepository = { findMany, findByName };
