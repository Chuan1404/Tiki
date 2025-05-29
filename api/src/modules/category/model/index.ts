import { z } from "zod";
import { EModelStatus } from "../../../share/model/enums";

export const CategorySchema = z.object({
    id: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    status: z.nativeEnum(EModelStatus),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;
