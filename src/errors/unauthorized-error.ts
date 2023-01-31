import { ApplicationError } from "./errorType";

export function unauthorizedError(message = "You must be signed in to continue"): ApplicationError {
  return {
    name: "UnauthorizedError",
    message,
  };
}
