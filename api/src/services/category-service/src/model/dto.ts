import { EModelStatus } from "devchu-common";
import { array, nativeEnum, object, string, z } from "zod";

export const CategoryCreateSchema = object({
    name: string().min(3, "Name must be at least 3 characters"),
    description: string().optional(),
});

export const CategoryUpdateSchema = object({
    name: string().min(3, "Name must be at least 3 characters").optional(),
    description: string().max(255, "descriptions must be at most 255 characters").optional(),
    status: nativeEnum(EModelStatus).optional(),
});

export const CategoryCondScheme = object({
    id: array(string()).optional(),
    name: string().optional(),
    status: nativeEnum(EModelStatus).optional(),
});

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>;
export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;
export type CategoryCondDTO = z.infer<typeof CategoryCondScheme>;
