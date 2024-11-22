import { array, nativeEnum, number, object, string, z } from "zod";
import { EModelStatus } from "../../../share/model/enums";

export const ProductCreateSchema = object({
  name: string().min(3, "Name must be at least 3 characters"),
  price: number().min(0).default(0),
  thumbnailUrl: string().optional(),
  brandName: string().optional(),
  categoryId: string(),
  brandId: string().optional(),
});

export const ProductUpdateSchema = object({
  name: string().min(3, "Name must be at least 3 characters").optional(),
  price: number().min(0).default(0).optional(),
  thumbnailUrl: string().optional(),
  brandName: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
  categoryId: string().optional(),
  brandId: string().optional(),
});

export const ProductCondScheme = object({
  id: array(string()).optional(),
  name: string().optional(),
  price: number().optional(),
  brandName: string().optional(),
  status: nativeEnum(EModelStatus).optional(),
  categoryId: string().optional(),
  brandId: string().optional(),
  slug: string().optional()
});

export const CategoryCondScheme = object({
  id: array(string())
});
export const BrandCondScheme = object({
  id: array(string())
});

export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;
export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;
export type ProductCondDTO = z.infer<typeof ProductCondScheme>;

export type BrandCondDTO = z.infer<typeof BrandCondScheme>
export type CategoryCondDTO = z.infer<typeof CategoryCondScheme>