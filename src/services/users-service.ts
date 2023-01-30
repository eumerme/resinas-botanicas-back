import { user } from "@prisma/client";
import bcrypt from "bcrypt";
import { conflictError } from "../errors";
import { usersRepository } from "../repositories";

async function createUser(data: user): Promise<user> {
  const userWithSameEmail = await usersRepository.findByEmail(data.email);
  if (userWithSameEmail) throw conflictError("Email já cadastrado");

  const hashedPassword = bcrypt.hashSync(data.password, 12);

  return usersRepository.create({
    ...data,
    password: hashedPassword,
  });
}

export const usersService = { createUser };
