import { Router } from "express";
import verifyReqBody, { verifyTokenUser } from "../middlewares/verifyFront";
import { userReqLoginSchema } from "../schemas/users";
import { verifyEmailExists } from "../middlewares/users";
import { sessionLoginUser } from "../controllers/session";

const sessionRouter = Router();

sessionRouter.post("", verifyReqBody(userReqLoginSchema), sessionLoginUser);

export default sessionRouter;
