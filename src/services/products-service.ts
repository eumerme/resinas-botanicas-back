import { productsRepository } from "../repositories";

async function listProducts() {
  const products = await productsRepository.findLatestProducts();

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.mainImage,
    description: p.description,
    category: p.category.name,
    price: p.price,
    inStock: p.inStock,
  }));
}

export const productsService = {
  listProducts,
};
