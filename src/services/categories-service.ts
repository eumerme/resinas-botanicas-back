import { notFoundError } from "../errors";
import * as categoriesRepository from "../repositories";

export async function listCategories() {
  const categories = await categoriesRepository.findMany();

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));
}

export async function listProductsByCategoryId(id: number) {
  const categoryExists = await categoriesRepository.findById(id);

  if (!categoryExists) throw notFoundError();

  const categoryWithProducts = await categoriesRepository.findProductsByCategoryId(id);

  return categoryWithProducts;
}
