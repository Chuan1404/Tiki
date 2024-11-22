import mongoose, { Types } from "mongoose";
import { IRepository } from "../interface";
import { PagingDTO } from "../model/paging";
import { EModelStatus } from "../model/enums";

export abstract class MongooseRepository<Entity, EntityCondDTO, EntityUpdateDTO>
  implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO> {
  constructor(private readonly modelName: string) { }

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
      rows = await mongoose.models[this.modelName]
        .find(condSQL)
    }

    return rows;
  }

  async insert(data: Entity): Promise<boolean> {
    await mongoose.models[this.modelName].create(data as any);

    return true;
  }
  async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
    await mongoose.models[this.modelName].updateOne({ id }, {$set: data as any});
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
