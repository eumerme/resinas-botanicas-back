import { productsRepository } from "../repositories";

async function listProducts() {
  return productsRepository.findLatestProducts();
}

export const productsService = {
  listProducts,
};
