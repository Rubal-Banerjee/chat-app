import { z } from "zod";

export const SignupSchema = z
  .object({
    fullName: z
      .string()
      .min(4, { message: "Your full name must be atleast 4 characters long" }),
    userName: z.string(),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password cannot be longer than 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "Password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"]),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const SigninSchema = z.object({
  userName: z.string(),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password cannot be longer than 65 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "Password should contain only alphabets and numbers"
    ),
});
