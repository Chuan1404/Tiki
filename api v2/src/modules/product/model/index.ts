import { date, nativeEnum, number, string, z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";

export const ProductSchema = z.object({
  id: string(),
  name: string().min(3, "Name must be at least 3 characters"),
  price: number().min(0).default(0),
  thumbnailUrl: string(),
  slug: string().optional(),
  brandId: string().optional(),
  categoryId: string(),
  status: nativeEnum(ModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export const BrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type Product = z.infer<typeof ProductSchema> & {
  category?: Category | null;
  brand?: Brand | null;
};
export type Category = z.infer<typeof CategorySchema>;
export type Brand = z.infer<typeof BrandSchema>;
