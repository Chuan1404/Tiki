import mongoose from "mongoose";
import { IRepository } from "../interface/repository.interface";
import { EModelStatus } from "../model/enums";
import { PagingDTO } from "../model/paging";

export abstract class MongooseRepository<Entity, EntityCondDTO, EntityUpdateDTO>
    implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
{
    constructor(private readonly url: string, private readonly modelName: string) {}

    async connect(): Promise<void> {
        if (mongoose.connection.readyState === 1) return;
        mongoose
            .connect(this.url)
            .then(() => {
                console.log("Mongoose connected successfully");
            })
            .catch((err) => {
                console.error("Mongoose connection error:", err);
            });
    }

    async findByCond(cond: EntityCondDTO): Promise<Entity | null> {
        let data = await mongoose.models[this.modelName].findOne(cond as any);
        if (!data) {
            return null;
        }

        return data;
    }

    async get(id: string): Promise<Entity | null> {
        let data = await mongoose.models[this.modelName].findOne({ id });
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
            rows = await mongoose.models[this.modelName]
                .find(condSQL)
                .limit(limit)
                .skip((page - 1) * limit);
        } else {
            rows = await mongoose.models[this.modelName].find(condSQL);
        }

        return rows;
    }

    async insert(data: Entity): Promise<boolean> {
        await mongoose.models[this.modelName].create(data as any);

        return true;
    }
    async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
        await mongoose.models[this.modelName].updateOne({ id }, { $set: data as any });
        return true;
    }
    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if (isHard) {
            await mongoose.models[this.modelName].deleteOne({ id });
        } else {
            await mongoose.models[this.modelName].updateOne(
                { id },
                { status: EModelStatus.DELETED }
            );
        }

        return true;
    }
}
