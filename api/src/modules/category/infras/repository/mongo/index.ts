import mongoose from "mongoose";
import { EModelStatus } from "../../../../../share/model/enums";
import { PagingDTO } from "../../../../../share/model/paging";
import { ICategoryRepository } from "../../../interface";
import { Category, CategorySchema } from "../../../model";
import {
    CategoryCondDTO,
    CategoryCreateDTO,
    CategoryUpdateDTO,
} from "../../../model/dto";
import { init } from "./dto";

export default class CategoryMongoRepository implements ICategoryRepository {
    constructor() {
        init();
    }

    async get(id: string): Promise<Category | null> {
        let data = await mongoose.models["Category"].findOne({ id });
        if (!data) {
            return null;
        }

        return CategorySchema.parse(data);
    }

    async findByCond(cond: CategoryCondDTO): Promise<Category | null> {
        const data = await mongoose.models["Category"].findOne(cond as any);
        if (!data) {
            return null;
        }

        return CategorySchema.parse(data);
    }

    async list(cond: CategoryCondDTO, paging?: PagingDTO): Promise<Category[]> {
        const condSQL = { ...cond, status: { $ne: EModelStatus.DELETED } };
        let rows;

        if (paging) {
            const { page, limit } = paging;
            rows = await mongoose.models["Category"]
                .find(condSQL)
                .limit(limit)
                .skip((page - 1) * limit);
        } else {
            rows = await mongoose.models["Category"].find(condSQL);
        }

        return rows;
    }

    async insert(data: CategoryCreateDTO): Promise<boolean> {
        await mongoose.models["Category"].create(data as any);

        return true;
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
        await mongoose.models["Category"].updateOne(
            { id },
            { $set: data as any }
        );
        return true;
    }

    async delete(id: string, isHard: boolean): Promise<boolean> {
        if (isHard) {
            await mongoose.models["Category"].deleteOne({ id });
        } else {
            await mongoose.models["Category"].updateOne(
                { id },
                { status: EModelStatus.DELETED }
            );
        }

        return true;
    }
}
