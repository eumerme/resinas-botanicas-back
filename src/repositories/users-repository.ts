import { user } from "@prisma/client";
import { prisma } from "../config";

async function findByEmail(email: string): Promise<user> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function create(data: user): Promise<user> {
  return prisma.user.create({
    data,
  });
}

export const usersRepository = {
  findByEmail,
  create,
};
