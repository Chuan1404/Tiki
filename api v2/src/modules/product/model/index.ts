import { number, string, z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";

export const ProductSchema = z.object({
  id: string(),
  name: string().min(3, "Name must be at least 3 characters"),
  price: number().min(0).default(0),
  thumbnailUrl: string(),
  slug: string().optional(),
  brandName: string().optional(),
  status: z.nativeEnum(ModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;
