import { productsRepository } from "../repositories";

async function listProducts() {
  const products = await productsRepository.findLatestProducts();

  return products;
}

export const productsService = {
  listProducts,
};
