import { Request, Response } from "express";
import httpStatus from "http-status";
import * as categoriesService from "../services";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoriesService.listCategories();

    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getProductsByCategory(req: Request, res: Response) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) return res.sendStatus(httpStatus.BAD_REQUEST);
  //TODO repetido no produto, adicionar ambos nos testes

  try {
    const categoryWithProducts = await categoriesService.listProductsByCategoryId(Number(id));

    return res.status(httpStatus.OK).send(categoryWithProducts);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
