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

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const product = await productsService.listProductById(Number(id));

    return res.status(httpStatus.OK).send(product);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getProductsByCategory(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) return res.sendStatus(httpStatus.BAD_REQUEST);
  //TODO repetido, adicionar ambos nos testes

  try {
    const products = await productsService.listProductsByCategoryId(Number(id));

    return res.status(httpStatus.OK).send(products);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
