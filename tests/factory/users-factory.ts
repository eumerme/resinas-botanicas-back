import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config";
import { user } from "@prisma/client";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

export async function createUser(email: string): Promise<user> {
  return prisma.user.create({
    data: {
      email: email || faker.internet.email(),
      name: faker.name.fullName(),
      password: faker.internet.password(8),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.number("##9########"),
    },
  });
}
