import { faker } from "@faker-js/faker";
import { product } from "@prisma/client";
import { prisma } from "../../src/config";

export async function createProduct(categoryId: number): Promise<product> {
  return prisma.product.create({
    data: {
      name: faker.name.fullName(),
      mainImage: faker.image.avatar(),
      description: faker.lorem.paragraph(),
      price: faker.datatype.number(),
      inStock: faker.datatype.number({ min: 0 }),
      categoryId,
    },
  });
}
