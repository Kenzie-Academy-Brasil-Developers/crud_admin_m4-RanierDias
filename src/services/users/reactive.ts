import { QueryConfig, QueryResult } from "pg";
import { IUser, IUserData, TRequestService } from "../../interfaces";
import { client } from "../../database";
import { userDataPublicSchema } from "../../schemas/users";
import AppError from "../../error";

const requestUserReactivation = async (payload: any, auth: boolean) => {
  const { id } = payload;

  if (!auth) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryText: string = `
  UPDATE users
  SET active = true
  WHERE id = $1 AND active = false
  RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [id],
  };

  const response: QueryResult<IUser> = await client.query(queryConfig);
  const user = response.rows[0];

  if (!user) {
    throw new AppError("User already active");
  }

  return userDataPublicSchema.parse(user);
};

export default requestUserReactivation;
