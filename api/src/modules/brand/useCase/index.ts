import { PagingDTO } from "@shared/model/paging";
import { v7 } from "uuid";
import { IBrandReposity, IBrandUseCase } from "../interface";
import { Brand, BrandSchema } from "../model";
import {
    BrandCondDTO,
    BrandCreateDTO,
    BrandCreateSchema,
    BrandUpdateDTO,
    BrandUpdateSchema,
} from "../model/dto";
import {
    Brand_InvalidError,
    BrandId_NotFoundError,
    BrandName_ExistedError,
    BrandName_InvalidError,
} from "../model/error";
import { EModelStatus } from "@shared/model/enums";

export class BrandUseCase implements IBrandUseCase {
    constructor(private readonly repository: IBrandReposity) {}

    async create(data: BrandCreateDTO): Promise<string> {
        const { success, data: parsedData, error } = BrandCreateSchema.safeParse(data);

        if (!success) {
            throw BrandName_InvalidError(data.name);
        }

        const isExisted = await this.repository.findByCond({
            name: parsedData.name,
        });

        if (isExisted) {
            throw BrandName_ExistedError(data.name);
        }

        let newId = v7();
        const brand: Brand = {
            id: newId,
            name: parsedData.name,
            status: EModelStatus.ACTIVE,
            description: parsedData.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(brand);

        return newId;
    }

    async update(id: string, data: BrandUpdateDTO): Promise<boolean> {
        const {
            success,
            data: parsedData,
            error,
        } = BrandUpdateSchema.safeParse(data);

        if (!data || !data.name) {
            throw Brand_InvalidError;
        }

        if (!success) {
            throw BrandName_InvalidError(data.name);
        }

        let brand = await this.repository.get(id);

        if (!brand || brand.status === EModelStatus.DELETED) {
            throw BrandId_NotFoundError(id);
        }

        return await this.repository.update(id, parsedData);
    }

    async get(id: string): Promise<Brand | null> {
        let data = await this.repository.get(id);

        if (!data || data.status === EModelStatus.DELETED) {
            throw BrandId_NotFoundError(id);
        }

        return BrandSchema.parse(data);
    }
    
    async list(cond: BrandCondDTO, paging: PagingDTO): Promise<Brand[]> {
        let data = await this.repository.list(cond, paging);

        return data ? data.map((item) => BrandSchema.parse(item)) : [];
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        let brand = await this.repository.get(id);
        if (!brand || brand.status === EModelStatus.DELETED) {
            throw BrandId_NotFoundError(id);
        }

        return await this.repository.delete(id, isHard);
    }
}
