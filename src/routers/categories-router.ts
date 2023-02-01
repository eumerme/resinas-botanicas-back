import { Router } from "express";
import { getCategories } from "../controllers";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);

export { categoriesRouter };
