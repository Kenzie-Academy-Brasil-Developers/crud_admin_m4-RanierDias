import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";
import "dotenv/config";

import AppError from "../../error";
import { IUser, TRequestService } from "../../interfaces";
import { userReqLoginSchema } from "../../schemas/users";

const requestSessionLoginUser: TRequestService<string> = async (payload) => {
  const sessionLogin = userReqLoginSchema.parse(payload);

  const queryText: string = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryText,
    values: [sessionLogin.email],
  };

  const response: QueryResult<IUser> = await client.query(queryConfig);
  const user = response.rows[0];

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  const passwordValidation = compareSync(sessionLogin.password, user.password);

  if (!passwordValidation) {
    throw new AppError("Wrong email/password", 401);
  }

  const token = sign(
    { email: user.email, admin: user.admin },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default requestSessionLoginUser;
