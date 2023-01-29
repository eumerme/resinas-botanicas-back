import { categoriesRepository } from "../repositories/categories-repository";

export async function listCategories() {
  const categories = await categoriesRepository.findMany();

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));
}
