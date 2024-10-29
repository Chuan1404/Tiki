import { z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";
import { BrandSchema } from ".";

export const BrandCreateSchema = BrandSchema.pick({
  name: true,
  description: true
})

export const BrandUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  description: z
    .string()
    .max(255, "descriptions must be at most 255 characters")
    .optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});

export const BrandCondScheme = z.object({
  name: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});

export type BrandUpdateDTO = z.infer<typeof BrandUpdateSchema>;
export type BrandCreateDTO = z.infer<typeof BrandCreateSchema>;
export type BrandCondDTO = z.infer<typeof BrandCondScheme>;
