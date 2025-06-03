import { EModelStatus, EUserRole } from "@shared/model/enums";
import { string, z } from "zod";


export const UserSchema = z.object({
  id: string(),
  name: string().min(3, "Name must be at least 3 characters"),
  password: string(),
  email: string(),
  status: z.nativeEnum(EModelStatus),
  role: z.nativeEnum(EUserRole),
  createdAt: z.date(),
  updatedAt: z.date(),
});


export type User = z.infer<typeof UserSchema>;
