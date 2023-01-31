import { createUser, invalidBody, validSigninBody, validSignupBody } from "../factory";

import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import { prisma } from "../../src/config";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /api/users/signup", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/api/users/signup");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const response = await server.post("/api/users/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when password and confirm password doesn't match", async () => {
    const response = await server.post("/api/users/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    it("should respond with status 409 when there is an user with given email", async () => {
      await createUser(validSignupBody);

      const response = await server.post("/api/users/signup").send(validSignupBody);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 when given email is unique", async () => {
      const response = await server.post("/api/users/signup").send(validSignupBody);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it("should save user on db", async () => {
      const beforeCount = await prisma.user.count();

      await server.post("/api/users/signup").send(validSignupBody);

      const afterCount = await prisma.user.count();

      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
    });
  });
});

describe("POST /api/users/signin", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/api/users/signin");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const response = await server.post("/api/users/signin").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    it("should respond with status 401 if there is no user for given email", async () => {
      const response = await server.post("/api/users/signin").send(validSigninBody);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      await createUser(validSigninBody);

      const response = await server.post("/api/users/signin").send({
        ...validSigninBody,
        password: "12312312",
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200 and user id, email, name and token", async () => {
        const user = await createUser(validSignupBody);

        const response = await server
          .post("/api/users/signin")
          .send({ email: validSignupBody.email, password: validSignupBody.password });

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({
          userId: expect.any(Number),
          email: user.email,
          name: user.name,
          token: expect.any(String),
        });
      });
    });
  });
});
