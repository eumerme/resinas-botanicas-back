import { categoriesRepository } from "../repositories";

export async function listCategories(): Promise<Categories[]> {
  const categories = await categoriesRepository.findMany();

  return categories.map((c) => ({
    id: c.id,
    name: c.name,
  }));
}

type Categories = {
  id: number;
  name: string;
};

export const categoriesService = { listCategories };
