import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createCategory, createProduct } from "../factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /categories", () => {
  it("should respond with status 200 and category list", async () => {
    const category = await createCategory();

    const response = await server.get("/categories");

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: category.name,
      },
    ]);
  });

  it("should respond with an empty array when there are no category", async () => {
    const response = await server.get("/categories");

    expect(response.body).toEqual([]);
  });
});

describe("GET /categories/:id/products", () => {
  it("should respond with status 200 and the products of the chosen category", async () => {
    const category = await createCategory();
    const product = await createProduct(category.id);

    const response = await server.get(`/categories/${category.id}/products`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      id: category.id,
      name: category.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      product: [
        {
          id: expect.any(Number),
          name: product.name,
          description: product.description,
          mainImage: product.mainImage,
          price: product.price,
          inStock: product.inStock,
          categoryId: category.id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ],
    });
  });

  it("should respond with category data and an empty array when there is no product of the chosen category", async () => {
    const category = await createCategory();

    const response = await server.get(`/categories/${category.id}/products`);

    expect(response.body).toEqual({
      id: category.id,
      name: category.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      product: [],
    });
  });

  it("should respond with status 404 if the category doesn't exist", async () => {
    const response = await server.get("/categories/0/products");

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
});