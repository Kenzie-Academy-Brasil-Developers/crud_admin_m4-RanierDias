import { TRequestController } from "../interfaces";
import requestSessionLoginUser from "../services/session";

export const sessionLoginUser: TRequestController = async (req, res) => {
  const token = await requestSessionLoginUser(req.body);

  return res.status(200).json({ token });
};
