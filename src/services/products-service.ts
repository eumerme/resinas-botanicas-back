import { product } from "@prisma/client";
import { notFoundError } from "../errors";
import { categoriesRepository, ProductDetail, productsRepository } from "../repositories";

async function listLatestProducts(): Promise<product[]> {
  return productsRepository.findLatestProducts();
}

async function listProductById(id: number): Promise<ProductDetail> {
  const product = await productsRepository.findOne(id);
  if (!product) throw notFoundError();

  return product;
}

async function listProductsByCategoryId(id: number): Promise<product[]> {
  const categoryExists = await categoriesRepository.findById(id);
  if (!categoryExists) throw notFoundError();

  return productsRepository.findProductsByCategoryId(id);
}

export const productsService = { listLatestProducts, listProductById, listProductsByCategoryId };
