import * as jwt from "jsonwebtoken";
import { prisma } from "../src/config";
import { user } from "@prisma/client";
import { createSession } from "./factory";

export async function cleanDb() {
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
}

export async function generateValidToken(user?: user) {
  const incomingUser = user;
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token, incomingUser.id);

  return token;
}
