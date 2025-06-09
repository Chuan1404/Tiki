import mongoose from "mongoose";
import { IRepository } from "../interface/repository.interface";
import { EModelStatus } from "../model/enums";
import { PagingDTO } from "../model/paging";

export abstract class MongooseRepository<Entity, EntityCondDTO, EntityUpdateDTO>
    implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
{
    constructor(private model: mongoose.Model<any>) {}

    async findByCond(cond: EntityCondDTO): Promise<Entity | null> {
        const data = await this.model.findOne(cond as any);
        if (!data) {
            return null;
        }

        return data;
    }

    async get(id: string): Promise<Entity | null> {
        let data = await this.model.findOne({ id });
        if (!data) {
            return null;
        }

        return data;
    }

    async list(cond: EntityCondDTO, paging?: PagingDTO): Promise<Entity[] | null> {
        const condSQL = { ...cond, status: { $ne: EModelStatus.DELETED } };
        let rows;

        if (paging) {
            const { page, limit } = paging;
            rows = await this.model
                .find(condSQL)
                .limit(limit)
                .skip((page - 1) * limit);
        } else {
            rows = await this.model.find(condSQL);
        }

        return rows;
    }

    async insert(data: Entity): Promise<boolean> {
        await this.model.create(data as any);

        return true;
    }
    async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
        await this.model.updateOne({ id }, { $set: data as any });
        return true;
    }
    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if (isHard) {
            await this.model.deleteOne({ id });
        } else {
            await this.model.updateOne({ id }, { status: EModelStatus.DELETED });
        }

        return true;
    }
}
