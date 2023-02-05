import { createUser, invalidBody, invalidSigninBody, validSignupBody } from "../factory";
import * as jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import app, { init } from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { prisma } from "../../src/config";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /users/signup", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/users/signup");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const response = await server.post("/users/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when password and confirm password doesn't match", async () => {
    const response = await server.post("/users/signup").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    it("should respond with status 409 when there is an user with given email", async () => {
      await createUser(validSignupBody);

      const response = await server.post("/users/signup").send(validSignupBody);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 when given email is unique", async () => {
      const response = await server.post("/users/signup").send(validSignupBody);

      expect(response.status).toBe(httpStatus.CREATED);
    });

    it("should save user on db", async () => {
      const beforeCount = await prisma.user.count();

      await server.post("/users/signup").send(validSignupBody);

      const afterCount = await prisma.user.count();

      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
    });
  });
});

describe("POST /users/signin", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/users/signin");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const response = await server.post("/users/signin").send(invalidBody);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when body is valid", () => {
    it("should respond with status 401 if there is no user for given email", async () => {
      const response = await server.post("/users/signin").send(invalidSigninBody);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      await createUser(invalidSigninBody);

      const response = await server.post("/users/signin").send({
        ...invalidSigninBody,
        password: "12312312",
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200 and user id, email, name and token", async () => {
        const user = await createUser(validSignupBody);

        const response = await server
          .post("/users/signin")
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

describe("GET /profile/:email", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/users/profile/fake@gmail.com");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/users/profile/fake@gmail.com").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/users/profile/fake@gmail.com").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and user data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const response = await server.get(`/users/profile/${user.email}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phone: user.phone,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it("should respond with 404 when given email doesn't exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const response = await server.get("/users/profile/fake@gmail.com").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
});
