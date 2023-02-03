import { Router } from "express";
import { getProductById, getProducts, getProductsByCategory } from "../controllers";
import { validateParams } from "../middlewares";
import { categoryParams } from "../schemas/categories-schema";

const productsRouter = Router();

productsRouter
  .get("/latest", getProducts)
  .get("/:id", getProductById)
  .get("/category/:id", validateParams(categoryParams), getProductsByCategory);

export { productsRouter };
