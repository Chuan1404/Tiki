import { EModelStatus } from "devchu-common";
import { date, nativeEnum, number, object, string, z } from "zod";

export const ProductSchema = object({
    id: string(),
    name: string().min(3, "Name must be at least 3 characters"),
    price: number().min(0).default(0),
    thumbnailUrl: string(),
    slug: string().optional(),
    brandId: string().optional(),
    categoryId: string(),
    status: nativeEnum(EModelStatus),
    createdAt: date(),
    updatedAt: date(),
});

const ProductSearchCondSchema = object({
    match: z.object({
        name: z.string().optional(),
    }).optional(),
})

export const ProductUpdateSchema = object({
    id: string(),
    name: string().min(3, "Name must be at least 3 characters").optional(),
    price: number().min(0).default(0).optional(),
    thumbnailUrl: string().optional(),
    brandName: string().optional(),
    status: nativeEnum(EModelStatus).optional(),
    categoryId: string().optional(),
    brandId: string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductSearchCondDTO = z.infer<typeof ProductSearchCondSchema>;
export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;