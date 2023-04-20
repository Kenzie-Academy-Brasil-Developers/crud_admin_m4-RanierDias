import { QueryConfig, QueryResult } from "pg";
import { IUser } from "../../interfaces";
import { client } from "../../database";
import AppError from "../../error";
import { Request, Response } from "express";

const requestUserDeactivition = async (payload: Request, auth: Response) => {
  const { id } = payload.params;
  const { admin } = auth.locals.user;
  const { admin: adminUserReq } = auth.locals.userRequested;

  if (adminUserReq && !admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryText: string = `
  UPDATE users
  SET active = false
  WHERE id = $1 AND active = true
  RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [id],
  };

  const response: QueryResult<IUser> = await client.query(queryConfig);
  const user = response.rows[0];

  if (!user) {
    throw new AppError("User already deactivated", 409);
  }
};

export default requestUserDeactivition;
