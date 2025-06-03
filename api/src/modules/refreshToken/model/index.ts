import { EModelStatus } from "@shared/model/enums";
import { date, nativeEnum, object, string, z } from "zod";


export const RefreshTokenSchema = object({
  id: string(),
  token: string(),
  userId: string(),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
