import { string, z } from "zod";
import { UserRole } from ".";
import { ModelStatus } from "../../../share/model/baseModel";

export const UserCreateSchema = z.object({
  name: string().min(3, "Name must be at least 3 characters"),
  password: string(),
  email: string(),
});

export const UserUpdateSchema = z.object({
  name: string().min(3, "Name must be at least 3 characters").optional(),
  status: z.nativeEnum(ModelStatus).optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export const UserCondScheme = z.object({
  name: string().optional(),
  email: string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
export type UserCondDTO = z.infer<typeof UserCondScheme>;
