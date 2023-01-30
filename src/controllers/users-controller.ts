import { user } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { usersService } from "../services";

export async function userSignup(req: Request, res: Response) {
  const body = req.body;
  delete body.confirmPassword;
  const data: user = body;

  try {
    await usersService.createUser(data);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
