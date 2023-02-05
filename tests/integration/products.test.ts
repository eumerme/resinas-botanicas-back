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

describe("GET /products/latest", () => {
  it("should respond with status 200 and the 10 most recent products", async () => {
    const category = await createCategory();
    const product = await createProduct(category.name);

    const response = await server.get("/products/latest");

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: product.name,
        description: product.description,
        mainImage: product.mainImage,
        price: product.price,
        inStock: product.inStock,
        categoryName: category.name,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  it("should respond with an empty array when there are no products", async () => {
    const response = await server.get("/products/latest");

    expect(response.body).toEqual([]);
  });
});

describe("GET /products/:id", () => {
  it("should respond with status 200 and product detail", async () => {
    const category = await createCategory();
    const product = await createProduct(category.name);

    const response = await server.get(`/products/${product.id}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: product.name,
      description: product.description,
      mainImage: product.mainImage,
      price: product.price,
      inStock: product.inStock,
      categoryName: category.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      category: {
        id: category.id,
        name: category.name,
        image: category.image,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("should respond with status 404 if the product doesn't exist", async () => {
    const response = await server.get("/products/0");

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
});

describe("GET /products/category/:id", () => {
  it("should respond with status 200 and the products of the chosen category", async () => {
    const category = await createCategory();
    const product = await createProduct(category.name);

    const response = await server.get(`/products/category/${category.name}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: product.name,
        description: product.description,
        mainImage: product.mainImage,
        price: product.price,
        inStock: product.inStock,
        categoryName: category.name,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  it("should respond with an empty array when there is no product of the chosen category", async () => {
    const category = await createCategory();

    const response = await server.get(`/products/category/${category.name}`);

    expect(response.body).toEqual([]);
  });

  it("should respond with status 404 if the category is not valid", async () => {
    const response = await server.get("/categories/0/products");

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it("should respond with status 404 when category id is not given", async () => {
    const response = await server.post("/categories/products");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});
