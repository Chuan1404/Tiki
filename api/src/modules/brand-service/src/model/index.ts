import { EModelStatus } from "devchu-common";
import { date, nativeEnum, object, string, z } from "zod";

export const BrandSchema = object({
  id: string(),
  name: string().min(2, "Name must be at least 2 characters"),
  description: string().optional(),
  status: nativeEnum(EModelStatus),
  createdAt: date(),
  updatedAt: date(),
});

export type Brand = z.infer<typeof BrandSchema>;
