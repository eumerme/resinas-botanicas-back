import * as jwt from "jsonwebtoken";
import { session, user } from "@prisma/client";
import bcrypt from "bcrypt";
import { conflictError, unauthorizedError } from "../errors";
import { usersRepository } from "../repositories";

const message = "Email ou senha incorretos";

async function signup(data: user): Promise<user> {
  const userWithSameEmail = await findUser(data.email);
  if (userWithSameEmail) throw conflictError("Email já cadastrado");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return usersRepository.createUser({
    ...data,
    password: hashedPassword,
  });
}

async function signin(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await findUser(email);
  if (!user) throw unauthorizedError(message);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw unauthorizedError(message);

  const token = await generateSession(user.id);

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    token,
  };
}

async function findUser(email: string): Promise<user> {
  return usersRepository.findByEmail(email);
}

async function generateSession(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await usersRepository.createSession({
    token,
    userId,
    active: true, //TODO retirar quando atualizar o prisma schema
  });

  return token;
}

export type SignInParams = Pick<user, "email" | "password">;
type SignInResult = Pick<user, "email" | "name"> & Pick<session, "userId" | "token">;

export const usersService = { signup, signin };
