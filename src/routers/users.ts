import { Router } from "express";

import {
  createUser,
  deactivitionUser,
  getListUsers,
  getUserOwner,
  reactivationUser,
  updateUser,
} from "../controllers/users";
import { verifyEmailExists, verifyUserExists } from "../middlewares/users";
import verifyReqBody, { verifyTokenUser } from "../middlewares/verifyFront";
import { userReqCreateSchema } from "../schemas/users";

const userRouter = Router();

userRouter.get("", verifyTokenUser, getListUsers);
userRouter.get("/profile", verifyTokenUser, getUserOwner);
userRouter.post(
  "",
  verifyReqBody(userReqCreateSchema),
  verifyEmailExists,
  createUser
);
userRouter.patch("/:id", verifyUserExists, verifyEmailExists, verifyTokenUser, updateUser);
userRouter.put(
  "/:id/recover",
  verifyUserExists,
  verifyTokenUser,
  reactivationUser
);
userRouter.delete("/:id", verifyUserExists, verifyTokenUser, deactivitionUser);

export default userRouter;
