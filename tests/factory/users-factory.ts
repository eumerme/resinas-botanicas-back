import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config";
import { user } from "@prisma/client";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

export async function createUser(params: Partial<user> = {}): Promise<user> {
  const incomingPassword = params.password || faker.internet.password(8);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      name: params.name || faker.name.fullName(),
      password: hashedPassword,
      cpf: params.cpf || generateCPF(),
      phone: params.phone || faker.phone.number("##9########"),
    },
  });
}

export const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

export const validSignupBody = {
  email: "teste@hotmail.com",
  name: "teste",
  phone: "11908664535",
  cpf: generateCPF(),
  password: "12345678",
  confirmPassword: "12345678",
};

export const invalidSigninBody = {
  email: "teste2@hotmail.com",
  password: "12345678",
};
