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

describe("GET /products", () => {
  it("should respond with status 200 and the 10 most recent products", async () => {
    const category = await createCategory();
    const product = await createProduct(category.id);

    const response = await server.post("/products");

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        name: product.name,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
        categoryId: category.id,
      },
    ]);
  });
});
