import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "./config";
import { productsRouter, categoriesRouter, usersRouter } from "./routers";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/api/health", (_req, res) => res.send("OK!"))
  .use("/api/products", productsRouter)
  .use("/api/categories", categoriesRouter)
  .use("/api/users", usersRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
