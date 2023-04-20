import format from "pg-format";
import { IUser, IUserData, TRequestService } from "../../interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { userDataPublicSchema, userReqUpdateSchema } from "../../schemas/users";
import AppError from "../../error";
import { Request, Response } from "express";

const requestUpdateUser = async (payload: Request, res: Response) => {
  const dataValidaton = userReqUpdateSchema.parse(payload.body);
  const { admin } = res.locals.user;
  const { id, admin: userReqAdmin } = res.locals.userRequested;

  if (userReqAdmin && !admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  const literalsQuery = Object.values(dataValidaton);
  const identifiersQuery = Object.keys(dataValidaton);

  const queryText = format(
    `
  UPDATE users
  SET (%I) = ROW(%L)
  WHERE id = $1
  RETURNING *;
  `,
    identifiersQuery,
    literalsQuery
  );

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [id],
  };

  const response: QueryResult<IUser> = await client.query(queryConfig);
  const user = userDataPublicSchema.parse(response.rows[0]);

  return user;
};

export default requestUpdateUser;
