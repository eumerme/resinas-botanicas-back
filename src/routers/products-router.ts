import { Router } from "express";
import { getProductById, getProducts } from "../controllers";

const productsRouter = Router();

productsRouter.get("/home", getProducts).get("/id/:id", getProductById);

export { productsRouter };
