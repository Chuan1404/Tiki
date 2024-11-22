import { z } from "zod";
import { EModelStatus } from "../../../share/model/enums";

export const BrandSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  status: z.nativeEnum(EModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Brand = z.infer<typeof BrandSchema>;
