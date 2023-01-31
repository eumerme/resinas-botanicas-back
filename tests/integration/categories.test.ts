import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { createCategory } from "../factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET api/categories", () => {
  it("should respond with status 200 and category list", async () => {
    const category = await createCategory();

    const response = await server.get("/api/categories");

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        name: category.name,
      },
    ]);
  });

  it("should respond with an empty array when there are no category", async () => {
    const response = await server.get("/api/categories");

    expect(response.body).toEqual([]);
  });
});
