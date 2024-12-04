import { Router } from "express";
import { SigninSchema, SignupSchema } from "@repo/types";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { jwtSecreat } from "../../config";
import { compare, hash } from "../../scrypt";
import { authMiddleware } from "../../middleware";

const authRouter = Router();

authRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await client.user.findUnique({
      where: {
        id: req.userId!,
      },
    });

    if (!user) {
      res.status(400).json({
        message: "User does not exists",
      });
      return;
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
});

authRouter.post("/signup", async (req, res) => {
  const parsedSingupInput = SignupSchema.safeParse(req.body);

  if (!parsedSingupInput.success) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }

  const hashedPassword: string = (await hash(
    parsedSingupInput.data.password
  )) as string;

  const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${parsedSingupInput.data.userName}`;
  const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${parsedSingupInput.data.userName}`;

  try {
    const user = await client.user.create({
      data: {
        fullName: parsedSingupInput.data.fullName,
        userName: parsedSingupInput.data.userName,
        password: hashedPassword,
        gender: parsedSingupInput.data.gender,
        profilePicture:
          parsedSingupInput.data.gender === "male" ? boyAvatar : girlAvatar,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      jwtSecreat,
      {
        expiresIn: "15d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Prevents XSS attacks Cross-Site scripting attacks
      sameSite: "strict", // Prevents CSRF (Cross-Site Request Forgery) Attacks
    });

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(400).json({
      message: "User already exists",
    });
  }
});

authRouter.post("/signin", async (req, res) => {
  const parsedSigninSchema = SigninSchema.safeParse(req.body);

  if (!parsedSigninSchema.success) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }

  try {
    const user = await client.user.findUnique({
      where: {
        userName: parsedSigninSchema.data.userName,
      },
      select: {
        id: true,
        password: true,
        fullName: true,
        userName: true,
        profilePicture: true,
      },
    });

    if (!user) {
      res.status(400).json({
        message: "Username does not exists",
      });
      return;
    }

    const comparedPassword = await compare(
      parsedSigninSchema.data.password,
      user.password
    );

    if (!comparedPassword) {
      res.status(401).json({
        message: "Your password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      jwtSecreat
    );

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Prevents XSS attacks Cross-Site scripting attacks
      sameSite: "strict", // Prevents CSRF (Cross-Site Request Forgery) Attacks
    });

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/signout", (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });

  res.status(200).json({
    message: "Signout successfull",
  });
});

export default authRouter;
