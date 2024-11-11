import { Router } from "express";
import userRouter from "./user";
import authRouter from "./auth";
import messageRouter from "./message";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/message", messageRouter);

export default mainRouter;
