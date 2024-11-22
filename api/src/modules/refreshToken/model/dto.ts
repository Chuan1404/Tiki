import { string, object, z, nativeEnum } from "zod";
import { RefreshTokenSchema } from ".";
import { EUserRole } from "../../../share/model/enums";

export const RefreshTokenCreateSchema = RefreshTokenSchema.pick({
  token: true,
  userId: true
});

export const RefreshTokenUpdateSchema = object({
});

export const RefreshTokenCondScheme = object({
  token: string().optional(),
});


export type RefreshTokenCreateDTO = z.infer<typeof RefreshTokenCreateSchema>;
export type RefreshTokenUpdateDTO = z.infer<typeof RefreshTokenUpdateSchema>;
export type RefreshTokenCondDTO = z.infer<typeof RefreshTokenCondScheme>;
