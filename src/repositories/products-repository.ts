import { category, product } from "@prisma/client";
import { prisma } from "../config";

async function findLatestProducts(): Promise<product[]> {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 10,
  });
}

async function findOne(id: number): Promise<ProductDetail> {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

async function findProductsByCategoryId(id: number) {
  return prisma.product.findMany({
    where: { category: { id } },
  });
}

type ProductDetail = product & {
  category: category;
};

export const productsRepository = { findLatestProducts, findOne, findProductsByCategoryId };
