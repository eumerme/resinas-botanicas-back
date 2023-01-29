import { notFoundError } from "../errors";
import * as productsRepository from "../repositories";

export async function listProducts(): Promise<LatestProducts[]> {
  const products = await productsRepository.findLatestProducts();

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.mainImage,
    price: p.price,
    inStock: p.inStock,
  }));
}

export async function listProductById(id: number): Promise<ProductDetailResponse> {
  const product = await productsRepository.findOne(id);

  if (!product) throw notFoundError();

  return {
    id: product.id,
    name: product.name,
    image: product.mainImage,
    description: product.description,
    category: product.category.name,
    price: product.price,
    inStock: product.inStock,
  };
}

type ProductDetailResponse = {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  inStock: number;
};

type LatestProducts = Omit<ProductDetailResponse, "description" | "category">;
