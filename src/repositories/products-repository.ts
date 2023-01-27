import { category, product } from "@prisma/client";
import { prisma } from "../config";

async function findLatestProducts(): Promise<ProductsWithCategoryName[]> {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 10,
    include: { category: true },
  });
}

type ProductsWithCategoryName = product & {
  category: category;
};

export const productsRepository = {
  findLatestProducts,
};
