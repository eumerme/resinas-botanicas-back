import { Router } from "express";
import { userSignup, userSignin, userProfile } from "../controllers";
import { authenticateToken, validateBody } from "../middlewares";
import { signinSchema, signupSchema } from "../schemas";

const usersRouter = Router();

usersRouter
  .post("/signup", validateBody(signupSchema), userSignup)
  .post("/signin", validateBody(signinSchema), userSignin)
  .get("/profile/:email", authenticateToken, userProfile);

export { usersRouter };
