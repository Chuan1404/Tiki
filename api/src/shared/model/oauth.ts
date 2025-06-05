import { z } from "zod";
import { EUserRole } from "./enums";

export const UserPayloadSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(EUserRole)
})

export type UserPayload = z.infer<typeof UserPayloadSchema>;