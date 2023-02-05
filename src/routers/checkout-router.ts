import { Router } from "express";
import { createCheckout } from "../controllers";
<<<<<<< HEAD
import { authenticateToken, validateBody } from "../middlewares";
import { cartItemSchema } from "../schemas/checkout-schema";
=======
import { validateBody } from "../middlewares";
import { cartItemSchema } from "../schemas";
>>>>>>> main

const stripeRouter = Router();

stripeRouter.post("/checkout-session", authenticateToken, validateBody(cartItemSchema), createCheckout);

export { stripeRouter };
