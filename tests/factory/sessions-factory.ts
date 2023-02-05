import { session } from "@prisma/client";
import { prisma } from "../../src/config";

export async function createSession(token: string, userId: number): Promise<session> {
  return prisma.session.create({
    data: {
      token,
      userId,
    },
  });
}
