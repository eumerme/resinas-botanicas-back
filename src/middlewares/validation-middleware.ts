import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "body");
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "params");
}

function validate(schema: ObjectSchema, type: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(",");
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message });
    } else {
      next();
    }
  };
}

// eslint-disable-next-line @typescript-eslint/type-annotation-spacing
type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
