import { Router } from "express";
import userRouter from "./user";
import authRouter from "./auth";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
