import "express-async-errors";
import { THandleRequestError } from "./interfaces";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.statusCode = status;
  }
}

export const requestError: THandleRequestError = (err, req, res, next) => {
  return err instanceof AppError
    ? res.status(err.statusCode).json({ message: err.message })
    : err instanceof ZodError
    ? res.status(400).json(err.flatten().fieldErrors)
    : res.status(500).json({ message: "Server internal error!" });
};

export default AppError;
