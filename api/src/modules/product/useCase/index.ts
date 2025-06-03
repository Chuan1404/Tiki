import { EModelStatus } from "@prisma/client";
import { PagingDTO } from "@shared/model/paging";
import { v7 } from "uuid";
import { IProductRepository, IProductUseCase } from "../interface";
import { Product, ProductSchema } from "../model";
import {
    ProductCondDTO,
    ProductCreateDTO,
    ProductCreateSchema,
    ProductUpdateDTO,
    ProductUpdateSchema,
} from "../model/dto";
import {
    Product_InvalidError,
    ProductId_NotFoundError,
    ProductName_ExistedError,
} from "../model/error";

export class ProductUseCase implements IProductUseCase {
    constructor(private readonly repository: IProductRepository) {}

    async create(data: ProductCreateDTO): Promise<string> {
        const {
            success,
            data: parsedData,
            error,
        } = ProductCreateSchema.safeParse(data);

        if (!success) {
            throw new Error(error.message);
        }

        const isExisted = await this.repository.findByCond({
            name: parsedData.name,
        });

        if (isExisted) {
            throw ProductName_ExistedError(data.name);
        }

        let newId = v7();
        const product: Product = {
            id: newId,
            name: parsedData.name,
            brandId: parsedData.brandId,
            categoryId: parsedData.categoryId,
            price: parsedData.price,
            thumbnailUrl: parsedData.thumbnailUrl ?? "",
            status: EModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(product);

        return newId;
    }

    async update(id: string, data: ProductUpdateDTO): Promise<boolean> {
        const {
            success,
            data: parsedData,
            error,
        } = ProductUpdateSchema.safeParse(data);

        if (!success) {
            throw Product_InvalidError;
        }

        let product = await this.repository.get(id);

        if (!product || product.status === EModelStatus.DELETED) {
            throw ProductId_NotFoundError(id);
        }

        return await this.repository.update(id, parsedData);
    }

    async get(id: string): Promise<Product | null> {
        let data = await this.repository.get(id);

        if (!data || data.status === EModelStatus.DELETED) {
            throw ProductId_NotFoundError(id);
        }

        return ProductSchema.parse(data);
    }

    async list(cond: ProductCondDTO, paging?: PagingDTO): Promise<Product[]> {
        let data = await this.repository.list(cond, paging);

        return data ? data.map((item) => ProductSchema.parse(item)) : [];
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        let product = await this.repository.get(id);
        if (!product || product.status === EModelStatus.DELETED) {
            throw ProductId_NotFoundError(id);
        }

        return await this.repository.delete(id, isHard);
    }
}
