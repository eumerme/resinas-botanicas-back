import { notFoundError } from "../errors";
import { categoriesRepository, productsRepository } from "../repositories";

async function listProducts(): Promise<LatestProducts[]> {
  const products = await productsRepository.findLatestProducts();

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.mainImage,
    price: p.price,
    inStock: p.inStock,
  }));
}

async function listProductById(id: number): Promise<ProductDetailResponse> {
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

async function listProductsByCategoryId(id: number) {
  const categoryExists = await categoriesRepository.findById(id);
  if (!categoryExists) throw notFoundError();

  const products = await productsRepository.findProductsByCategoryId(id);

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.mainImage,
    description: product.description,
    price: product.price,
    inStock: product.inStock,
  }));
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

export const productsService = { listProducts, listProductById, listProductsByCategoryId };
