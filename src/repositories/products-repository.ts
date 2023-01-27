import { category, product } from "@prisma/client";
import { prisma } from "../config";

export async function findLatestProducts(): Promise<product[]> {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 10,
  });
}

export async function findOne(id: number): Promise<ProductDetail> {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

type ProductDetail = product & {
  category: category;
};
