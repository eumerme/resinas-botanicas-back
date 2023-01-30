import { Router } from "express";
import { userSignup } from "../controllers";
import { validateBody } from "../middlewares";
import { signupSchema } from "../schemas";

const usersRouter = Router();

usersRouter.post("/signup", validateBody(signupSchema), userSignup);

export { usersRouter };
