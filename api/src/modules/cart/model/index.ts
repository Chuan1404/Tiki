import { EModelStatus } from "@prisma/client";
import { date, nativeEnum, number, object, string, z } from "zod";

export const CartSchema = object({
  id: string(),
  productId: string(),
  userId: string(),
  quantity: number().min(1).default(1),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export const ProductSchema = object({
  id: string(),
  name: string(),
  price: number(),
  thumbnailUrl: string(),
})

export type Cart = z.infer<typeof CartSchema> & {
  product?: Product
};
export type Product = z.infer<typeof ProductSchema>;
