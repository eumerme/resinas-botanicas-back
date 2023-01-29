import { Router } from "express";
import { getCategories, getProductsByCategory } from "../controllers";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories).get("/:id/products", getProductsByCategory);

export { categoriesRouter };
