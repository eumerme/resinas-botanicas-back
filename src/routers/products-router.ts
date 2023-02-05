import { Router } from "express";
import { getProductById, getProducts, getProductsByCategory } from "../controllers";
import { validateParams } from "../middlewares";
import { categoryParams } from "../schemas";

const productsRouter = Router();

productsRouter
  .get("/latest", getProducts)
  .get("/:id", getProductById)
  .get("/category/:name", validateParams(categoryParams), getProductsByCategory);

export { productsRouter };
