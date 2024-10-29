import { number, string, z } from "zod";

export const CartCreateSchema = z.object({
  productId: string(),
  userId: string(),
  quantity: number().min(1).default(1),
});

export const CartUpdateSchema = z.object({
  productId: string().optional(),
  userId: string().optional(),
  quantity: number().min(1),
});

export const CartDeleteSchema = z.object({
  productId: string(),
  userId: string(),
});

export const CartCondScheme = z.object({
  productId: string().optional(),
  userId: string().optional(),
});

export type CartCreateDTO = z.infer<typeof CartCreateSchema>;
export type CartUpdateDTO = z.infer<typeof CartUpdateSchema>;
export type CartDeleteDTO = z.infer<typeof CartDeleteSchema>;
export type CartCondDTO = z.infer<typeof CartCondScheme>;