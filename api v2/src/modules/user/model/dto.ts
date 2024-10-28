import { string, z } from "zod";
import { UserRole, UserSchema } from ".";
import { ModelStatus } from "../../../share/model/baseModel";

export const UserCreateSchema = UserSchema.pick({
  name: true,
  password: true,
  email: true,
});

export const UserLoginSchema = UserSchema.pick({
  email: true,
  password: true,
  role: true
});

export const UserPayloadSchema = UserSchema.pick({
  id: true,
  email: true,
  role: true
})

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
export type UserLoginDTO = z.infer<typeof UserLoginSchema>;
export type UserPayloadDTO = z.infer<typeof UserPayloadSchema>;
