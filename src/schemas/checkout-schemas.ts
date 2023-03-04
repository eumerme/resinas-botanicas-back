import Joi from "joi";

export const cartItemSchema = Joi.object({
  cartItems: Joi.array().items({
    id: Joi.number().positive().required(),
    name: Joi.string().trim().required(),
    mainImage: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().positive().required(),
    inStock: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
    categoryName: Joi.string().trim().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    category: Joi.object({
      id: Joi.number().positive().required(),
      name: Joi.string().trim().required(),
      createdAt: Joi.date().required(),
      updatedAt: Joi.date().required(),
    }),
  }),
  userId: Joi.number().positive().required(),
});
