import { Request, Response } from "express";
import httpStatus from "http-status";
import { productsService } from "../services";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productsService.listProducts();

    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
