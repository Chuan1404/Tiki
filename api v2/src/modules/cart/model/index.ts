import { date, nativeEnum, number, string, z } from "zod";
import { EModelStatus } from "../../../share/model/enums";

export const CartSchema = z.object({
  id: string(),
  productId: string(),
  userId: string(),
  quantity: number().min(1).default(1),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export type Cart = z.infer<typeof CartSchema>;
