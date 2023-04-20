import { ZodSchema, z } from "zod";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { userDataPublicSchema, userReqCreateSchema } from "../schemas/users";

export type IUserData = z.infer<typeof userDataPublicSchema>;

export interface IUser extends IUserData {
  password: string;
}

export type IUserReq = z.infer<typeof userReqCreateSchema>;

export type TRequestController = (
  req: Request,
  res: Response
) => Promise<Response>;

export type TRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type TRequestService<T> = (payload: any) => Promise<T>;

export type THandleRequestError = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => Response;

export type TValidationReqBody = (schema: ZodSchema) => TRequestMiddleware;
