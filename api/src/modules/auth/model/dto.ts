import { EUserRole } from "@shared/model/enums";
import z, { nativeEnum, object, string } from "zod";

export const AuthRegisterSchema = object({
  name: string().min(3, "Name must be at least 3 characters"),
  password: string(),
  email: string(),
  role: nativeEnum(EUserRole)
})

export const AuthLoginSchema = AuthRegisterSchema.pick({
  email: true,
  password: true,
  role: true
});

export const AuthPayloadSchema = object({
  id: string(),
  email: string(),
  role: string()
})

export type AuthTokenDTO = {accessToken: string, refreshToken: string}
export type AuthRegisterDTO = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>;
export type AuthPayloadDTO = z.infer<typeof AuthPayloadSchema>;
