import { QueryConfig, QueryResult } from "pg";
import { IUser, IUserData, TRequestMiddleware } from "../interfaces";
import { client } from "../database";
import AppError from "../error";

export const verifyEmailExists: TRequestMiddleware = async (req, res, next) => {
  const { email } = req.body;

  const queryText: string = `
  SELECT *
  FROM users
  WHERE "email" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [email],
  };

  const data: QueryResult<IUserData> = await client.query(queryConfig);
  const user = data.rows[0];

  if (user) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export const verifyUserExists: TRequestMiddleware = async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.body.userId;

  const queryText: string = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [id],
  };

  const response: QueryResult<IUser> = await client.query(queryConfig);
  const user = response.rows[0];

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.locals.userRequested = user;

  return next();
};
