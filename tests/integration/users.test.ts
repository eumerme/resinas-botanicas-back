import { createUser } from "../factory";

import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { prisma } from "../../src/config";
import { faker } from "@faker-js/faker";
import { generateCPF } from "@brazilian-utils/brazilian-utils";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

//TODO: fix
describe("POST /api/users/signup", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/api/users/signup");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/api/users/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when password and confirm password doesn't match", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/api/users/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    const password = faker.internet.password(8);
    const generateValidBody = () => ({
      email: faker.internet.email(),
      name: faker.name.fullName(),
      birthday: faker.date.past(),
      phone: faker.phone.number("##9########"),
      cpf: generateCPF(),
      password,
      confirmPassword: password,
    });

    it("should respond with status 409 when there is an user with given email", async () => {
      const body = generateValidBody();
      await createUser(body.email);

      const response = await server.post("/api/users/signup").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 when given email is unique", async () => {
      const body = generateValidBody();

      const response = await server.post("/api/users/signup").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it("should save user on db", async () => {
      const body = generateValidBody();

      const beforeCount = await prisma.user.count();

      await server.post("/api/users/signup").send(body);

      const afterCount = await prisma.user.count();

      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
    });
  });
});
