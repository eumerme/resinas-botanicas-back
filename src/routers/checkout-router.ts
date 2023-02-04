import { Router } from "express";
import { createCheckout } from "../controllers";
import { validateBody } from "../middlewares";
import { cartItemSchema } from "../schemas";

const stripeRouter = Router();

stripeRouter.post("/checkout-session", validateBody(cartItemSchema), createCheckout);

export { stripeRouter };
