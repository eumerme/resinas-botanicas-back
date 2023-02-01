import { Prisma, session, user } from "@prisma/client";
import { prisma } from "../config";

async function findByEmail(email: string): Promise<user> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUser(data: user): Promise<user> {
  return prisma.user.create({
    data,
  });
}

async function createSession(data: Prisma.sessionUncheckedCreateInput): Promise<session> {
  return prisma.session.create({
    data,
  });
}

export const usersRepository = {
  findByEmail,
  createUser,
  createSession,
};
