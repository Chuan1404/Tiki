import { date, nativeEnum, string, z } from "zod";
import { EModelStatus } from "../../../share/model/enums";


export const RefreshTokenSchema = z.object({
  id: string(),
  token: string(),
  userId: string(),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
