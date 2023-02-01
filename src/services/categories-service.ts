import { category } from "@prisma/client";
import { categoriesRepository } from "../repositories";

export async function listCategories(): Promise<category[]> {
  return categoriesRepository.findMany();
}

export const categoriesService = { listCategories };
