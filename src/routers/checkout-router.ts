import { Router } from "express";
import { createCheckout } from "../controllers";
import { authenticateToken, validateBody } from "../middlewares";
import { cartItemSchema } from "../schemas/checkout-schema";

const stripeRouter = Router();

stripeRouter.post("/checkout-session", authenticateToken, validateBody(cartItemSchema), createCheckout);

export { stripeRouter };
