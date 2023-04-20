import format from "pg-format";
import { IUserData, TRequestService } from "../../interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { userDataPublicSchema, userReqCreateSchema } from "../../schemas/users";
import { hashSync } from "bcryptjs";

const requestCreateUser: TRequestService<IUserData> = async (payload) => {
  payload.password = hashSync(payload.password, 10);

  const identifiersQuery = Object.keys(payload);
  const literalsQuery = Object.values(payload);

  const queryText = format(
    `
  INSERT INTO users
  (%I) VALUES (%L)
  RETURNING *;
  `,
    identifiersQuery,
    literalsQuery
  );

  const response: QueryResult<IUserData> = await client.query(queryText);
  const user = userDataPublicSchema.parse(response.rows[0]);

  return user;
};

export default requestCreateUser;
