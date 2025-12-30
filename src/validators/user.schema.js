import { z } from "zod";

const baseUpdateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
});

export const updateProfileSchema = baseUpdateSchema.partial();

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});
