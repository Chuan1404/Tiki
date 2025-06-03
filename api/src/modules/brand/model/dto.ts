import { EModelStatus } from "@shared/model/enums";
import { array, nativeEnum, object, string, z } from "zod";
import { BrandSchema } from ".";

export const BrandCreateSchema = BrandSchema.pick({
    name: true,
    description: true,
});

export const BrandUpdateSchema = object({
    name: string().min(2, "Name must be at least 2 characters").optional(),
    description: string()
        .max(255, "descriptions must be at most 255 characters")
        .optional(),
    status: nativeEnum(EModelStatus).optional(),
});

export const BrandCondScheme = object({
    id: array(string()).optional(),
    name: string().optional(),
    status: nativeEnum(EModelStatus).optional(),
});

export type BrandUpdateDTO = z.infer<typeof BrandUpdateSchema>;
export type BrandCreateDTO = z.infer<typeof BrandCreateSchema>;
export type BrandCondDTO = z.infer<typeof BrandCondScheme>;
