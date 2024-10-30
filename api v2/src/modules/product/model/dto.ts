import { number, string, z } from "zod";
import { EModelStatus } from "../../../share/model/enums";

export const ProductCreateSchema = z.object({
  name: string().min(3, "Name must be at least 3 characters"),
  price: number().min(0).default(0),
  thumbnailUrl: string().optional(),
  brandName: string().optional(),
  categoryId: string(),
  brandId: string().optional(),
});

export const ProductUpdateSchema = z.object({
  name: string().min(3, "Name must be at least 3 characters").optional(),
  price: number().min(0).default(0).optional(),
  thumbnailUrl: string().optional(),
  brandName: string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
  categoryId: string().optional(),
  brandId: string().optional(),
});

export const ProductCondScheme = z.object({
  name: z.string().optional(),
  price: number().optional(),
  brandName: string().optional(),
  status: z.nativeEnum(EModelStatus).optional(),
  categoryId: string().optional(),
  brandId: string().optional(),
});

export const CategoryCondScheme = z.object({
  id: z.array(z.string())
});
export const BrandCondScheme = z.object({
  id: z.array(z.string())
});

export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;
export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;
export type ProductCondDTO = z.infer<typeof ProductCondScheme>;

export type BrandCondDTO = z.infer<typeof BrandCondScheme>
export type CategoryCondDTO = z.infer<typeof CategoryCondScheme>