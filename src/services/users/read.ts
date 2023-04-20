import { QueryConfig, QueryResult } from "pg";
import { IUser, IUserData, TRequestService } from "../../interfaces";
import { client } from "../../database";
import AppError from "../../error";
import { userDataPublicSchema } from "../../schemas/users";

const requestListUser: TRequestService<IUserData[]> = async (payload) => {
  const { admin } = payload;

  if (!admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryText: string = `
  SELECT id, name, email, admin, active
  FROM users
  ORDER BY id;
  `;

  const response: QueryResult<IUserData> = await client.query(queryText);
  const listUser = response.rows;

  return listUser;
};

export const requestUserOwner: TRequestService<IUserData> = async (payload) => {
  const { id } = payload;

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
  const user = userDataPublicSchema.parse(response.rows[0]);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default requestListUser;
