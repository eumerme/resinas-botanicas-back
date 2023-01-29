import { Router } from "express";
import { getProductById, getProducts, getProductsByCategory } from "../controllers";

const productsRouter = Router();

productsRouter.get("/home", getProducts).get("/:id", getProductById).get("/category/:id", getProductsByCategory);

export { productsRouter };
