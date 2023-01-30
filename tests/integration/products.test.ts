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

describe("GET /products/home", () => {
  it("should respond with status 200 and the 10 most recent products", async () => {
    const category = await createCategory();
    const product = await createProduct(category.id);

    const response = await server.get("/products/home");

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: product.name,
        image: product.mainImage,
        price: product.price,
        inStock: product.inStock,
      },
    ]);
  });

  it("should respond with an empty array when there are no products", async () => {
    const response = await server.get("/products/home");

    expect(response.body).toEqual([]);
  });
});

describe("GET /products/:id", () => {
  it("should respond with status 200 and product detail", async () => {
    const category = await createCategory();
    const product = await createProduct(category.id);

    const response = await server.get(`/products/${product.id}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: product.name,
      image: product.mainImage,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      category: category.name,
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
    const product = await createProduct(category.id);

    const response = await server.get(`/products/category/${category.id}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: product.name,
        description: product.description,
        image: product.mainImage,
        price: product.price,
        inStock: product.inStock,
      },
    ]);
  });

  it("should respond with an empty array when there is no product of the chosen category", async () => {
    const category = await createCategory();

    const response = await server.get(`/products/category/${category.id}`);

    expect(response.body).toEqual([]);
  });

  it("should respond with status 404 if the category doesn't exist", async () => {
    const response = await server.get("/categories/0/products");

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
});
