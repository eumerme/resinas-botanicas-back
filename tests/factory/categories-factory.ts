import { faker } from "@faker-js/faker";
import { category } from "@prisma/client";
import { prisma } from "../../src/config";

export async function createCategory(): Promise<category> {
  return prisma.category.create({
    data: {
      name: faker.name.firstName(),
      image: faker.image.imageUrl(),
    },
  });
}
