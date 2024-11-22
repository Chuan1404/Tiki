import { date, nativeEnum, number, object, string, z } from "zod";
import { EModelStatus } from "../../../share/model/enums";

export const ProductSchema = object({
  id: string(),
  name: string().min(3, "Name must be at least 3 characters"),
  price: number().min(0).default(0),
  thumbnailUrl: string(),
  slug: string().optional(),
  brandId: string().optional(),
  categoryId: string(),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export const BrandSchema = object({
  id: z.string().uuid(),
  name: z.string(),
});

export const CategorySchema = object({
  id: string().uuid(),
  name: string(),
});

export type Product = z.infer<typeof ProductSchema> & {
  category?: Category | null;
  brand?: Brand | null;
};
export type Category = z.infer<typeof CategorySchema>;
export type Brand = z.infer<typeof BrandSchema>;
