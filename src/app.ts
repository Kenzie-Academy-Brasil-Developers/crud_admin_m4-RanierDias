import express, { Application, json } from "express";
import userRouter from "./routers/users";
import { requestError } from "./error";
import sessionRouter from "./routers/session";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter)

app.use(requestError);

export default app;
