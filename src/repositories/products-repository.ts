import { prisma } from "../config";

async function findLatestProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 10,
  });
}

export const productsRepository = {
  findLatestProducts,
};
