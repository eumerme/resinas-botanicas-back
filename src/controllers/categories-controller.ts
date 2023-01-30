import { Request, Response } from "express";
import httpStatus from "http-status";
import { categoriesService } from "../services";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoriesService.listCategories();

    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
