import { EModelStatus } from "devchu-common";
import { z, string, nativeEnum, date } from "zod";

export const CategorySchema = z.object({
    id: string(),
    name: string().min(3, "Name must be at least 3 characters"),
    description: string().optional(),
    status: nativeEnum(EModelStatus),
    createdAt: date(),
    updatedAt: date(),
});

export type Category = z.infer<typeof CategorySchema>;
