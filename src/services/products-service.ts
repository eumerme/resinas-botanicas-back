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

async function listProductsByCategoryName(name: string): Promise<product[]> {
  const categoryExists = await categoriesRepository.findByName(name);
  if (!categoryExists) throw notFoundError();

  return productsRepository.findProductsByCategoryName(name);
}

export const productsService = { listLatestProducts, listProductById, listProductsByCategoryName };
