import { user } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { SignInParams, usersService } from "../services";

export async function userSignup(req: Request, res: Response) {
  const body = req.body;
  delete body.confirmPassword;
  const data: user = body;

  try {
    await usersService.signup(data);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function userSignin(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const user = await usersService.signin({ email, password });
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}

export async function userProfile(req: Request, res: Response) {
  const { email } = req.params;

  try {
    const user = await usersService.findUser(email);
    delete user.password;
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}
