import { client } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecreat } from "./config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({
      message: "Access restricted, please signup or signin",
    });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecreat) as { userId: string };
    const user = await client.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid User",
      });
      return;
    }

    req.userId = user?.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Access restricted, please signup or signin",
    });
  }
};
