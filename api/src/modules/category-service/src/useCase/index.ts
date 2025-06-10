import { EModelStatus, PagingDTO } from "devchu-common";
import { v7 } from "uuid";
import { ICategoryRepository, ICategoryUseCase } from "../interface";
import { Category, CategorySchema } from "../model";
import {
    CategoryCondDTO,
    CategoryCreateDTO,
    CategoryCreateSchema,
    CategoryUpdateDTO,
    CategoryUpdateSchema,
} from "../model/dto";
import {
    CategoryId_NotFoundError,
    CategoryName_ExistedError,
    CategoryName_InvalidError,
} from "../model/error";

export class CategoryUseCase implements ICategoryUseCase {
    constructor(private readonly repository: ICategoryRepository) {}

    async create(data: CategoryCreateDTO): Promise<string> {
        const { success, data: parsedData } = CategoryCreateSchema.safeParse(data);

        if (!success) {
            throw CategoryName_InvalidError(data.name);
        }

        const isExisted = await this.repository.findByCond({
            name: parsedData.name,
        });

        if (isExisted) {
            throw CategoryName_ExistedError(data.name);
        }

        let newId = v7();
        const category: Category = {
            id: newId,
            name: parsedData.name,
            status: EModelStatus.ACTIVE,
            description: parsedData.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(category);

        return newId;
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        const { success, data: parsedData, error } = CategoryUpdateSchema.safeParse(data);

        if (!success) {
            throw new Error(error.message);
        }

        const category = await this.repository.get(id);

        if (!category || category.status === EModelStatus.DELETED) {
            throw CategoryId_NotFoundError(id);
        }

        return await this.repository.update(id, parsedData);
    }

    async get(id: string): Promise<Category | null> {
        let data = await this.repository.get(id);

        if (!data || data.status === EModelStatus.DELETED) {
            throw CategoryId_NotFoundError(id);
        }

        return CategorySchema.parse(data);
    }

    async list(cond: CategoryCondDTO, paging?: PagingDTO): Promise<Category[]> {
        let data = await this.repository.list(cond, paging);

        return data ? data.map((item) => CategorySchema.parse(item)) : [];
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        let category = await this.repository.get(id);
        if (!category || category.status === EModelStatus.DELETED) {
            throw CategoryId_NotFoundError(id);
        }

        return await this.repository.delete(id, isHard);
    }
}
