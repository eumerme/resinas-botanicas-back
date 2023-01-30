import { category } from "@prisma/client";
import { prisma } from "../config";

export async function findMany(): Promise<category[]> {
  return prisma.category.findMany();
}

export async function findById(id: number): Promise<category> {
  return prisma.category.findUnique({
    where: { id },
  });
}

export const categoriesRepository = { findMany, findById };
