import { Request, Response } from "express";
import httpStatus from "http-status";
import { createStripeSession } from "../services";

export async function createCheckout(req: Request, res: Response) {
  const { cartItems } = req.body;

  try {
    const session = await createStripeSession(cartItems);
    return res.send({ url: session.url });
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
