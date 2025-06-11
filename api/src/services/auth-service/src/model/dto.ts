import { EModelStatus, EUserRole } from "devchu-common/model/enums";
import z, { date, nativeEnum, object, string } from "zod";

// Auth
export const AuthRegisterSchema = object({
    name: string().min(3, "Name must be at least 3 characters"),
    password: string(),
    email: string(),
    role: nativeEnum(EUserRole),
});

export const AuthLoginSchema = AuthRegisterSchema.pick({
    email: true,
    password: true,
    role: true,
});

export const AuthPayloadSchema = object({
    id: string(),
    email: string(),
    role: string(),
});

export type AuthTokenDTO = { accessToken: string; refreshToken: string };
export type AuthRegisterDTO = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>;
export type AuthPayloadDTO = z.infer<typeof AuthPayloadSchema>;

// Token
export const TokenSchema = object({
    token: string(),
    userId: string(),
    status: nativeEnum(EModelStatus),
    createdAt: date(),
    updatedAt: date(),
});

export const TokenCreateSchema = TokenSchema.pick({
    token: true,
    userId: true,
});

export const TokenUpdateSchema = object({});

export const TokenCondScheme = object({
    token: string().optional(),
});

export type Token = z.infer<typeof TokenSchema>;
export type TokenCreateDTO = z.infer<typeof TokenCreateSchema>;
export type TokenUpdateDTO = z.infer<typeof TokenUpdateSchema>;
export type TokenCondDTO = z.infer<typeof TokenCondScheme>;

// User
export const UserSchema = object({
    id: string(),
    name: string().min(3, "Name must be at least 3 characters"),
    password: string(),
    email: string(),
    role: nativeEnum(EUserRole),
});

export const UserCreateSchema = UserSchema.pick({
    name: true,
    password: true,
    email: true,
});

export const UserCondSchema = object({
    email: string().optional(),
})
export type User = z.infer<typeof UserSchema>;
export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export type UserCondDTO = z.infer<typeof UserCondSchema>;