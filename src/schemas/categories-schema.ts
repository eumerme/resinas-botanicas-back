import { category } from "@prisma/client";
import Joi from "joi";

export const categoryParams = Joi.object<categoryId>({
  id: Joi.number().positive().required(),
});

type categoryId = Pick<category, "id">;
