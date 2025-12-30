import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email({ message: "enter valid email" }),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "enter valid email" }),
  password: z.string().min(6),
});
