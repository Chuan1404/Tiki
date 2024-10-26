import { number, string, z } from "zod";

export const CartSchema = z.object({
  id: string(),
  productId: string(),
  userId: string(),
  quantity: number().min(1).default(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Cart = z.infer<typeof CartSchema>;
