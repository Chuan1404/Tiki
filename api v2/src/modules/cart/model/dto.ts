import { array, number, object, string, z } from "zod";

export const CartCreateSchema = object({
  productId: string(),
  userId: string(),
  quantity: number().min(1).default(1),
});

export const CartUpdateSchema = object({
  productId: string().optional(),
  userId: string().optional(),
  quantity: number().min(1),
});

export const CartDeleteSchema = object({
  productId: string(),
  userId: string(),
});

export const CartCondScheme = object({
  productId: string().optional(),
  userId: string().optional(),
});



export type CartCreateDTO = z.infer<typeof CartCreateSchema>;
export type CartUpdateDTO = z.infer<typeof CartUpdateSchema>;
export type CartDeleteDTO = z.infer<typeof CartDeleteSchema>;
export type CartCondDTO = z.infer<typeof CartCondScheme>;

// RPC
export const ProductCondScheme = object({
  id: array(string())
});
export type ProductCondDTO = z.infer<typeof ProductCondScheme>;
