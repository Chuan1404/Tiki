import { string, z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export const UserSchema = z.object({
  id: string(),
  name: string().min(3, "Name must be at least 3 characters"),
  password: string(),
  email: string(),
  status: z.nativeEnum(ModelStatus),
  role: z.nativeEnum(UserRole),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
