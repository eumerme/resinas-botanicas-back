import { category, product } from "@prisma/client";
import { prisma } from "../config";

async function findLatestProducts(): Promise<product[]> {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 6,
  });
}

async function findOne(id: number): Promise<ProductDetail> {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

async function findProductsByCategoryName(name: string): Promise<product[]> {
  return prisma.product.findMany({
    where: { categoryName: name },
  });
}

export type ProductDetail = product & {
  category: category;
};

export const productsRepository = { findLatestProducts, findOne, findProductsByCategoryName };
