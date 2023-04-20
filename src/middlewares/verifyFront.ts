import { verify } from "jsonwebtoken";
import AppError from "../error";
import { TRequestMiddleware, TValidationReqBody } from "../interfaces";

const verifyReqBody: TValidationReqBody = (schema) => (req, res, next) => {
  const data = schema.parse(req.body);
  req.body = data;

  return next();
};

export const verifyTokenUser: TRequestMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const [, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    res.locals.user = {
      id: Number(decoded.sub),
      email: decoded.email,
      admin: decoded.admin,
    };
  });

  return next();
};

export default verifyReqBody;
