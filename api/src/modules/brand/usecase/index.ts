import { v7 } from "uuid";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/errors";
import { EModelStatus } from "../../../share/model/enums";
import { PagingDTO } from "../../../share/model/paging";
import { IBrandReposity, IBrandUseCase } from "../interface";
import { Brand, BrandSchema } from "../model";
import {
  BrandCondDTO,
  BrandCreateDTO,
  BrandCreateSchema,
  BrandUpdateDTO,
  BrandUpdateSchema,
} from "../model/dto";

export class BrandUsecase implements IBrandUseCase {
  constructor(private readonly repository: IBrandReposity) {}

  async create(data: BrandCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
    } = BrandCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const isExisted = await this.repository.findByCond({
      name: parsedData.name,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let newId = v7();
    const Brand: Brand = {
      id: newId,
      name: parsedData.name,
      status: EModelStatus.ACTIVE,
      description: parsedData.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(Brand);

    return newId;
  }
  async update(id: string, data: BrandUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = BrandUpdateSchema.safeParse(data);

    if (!success) {
      throw new Error(error.message);
    }

    let Brand = await this.repository.get(id);

    if (!Brand || Brand.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }
  async get(id: string): Promise<Brand | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return BrandSchema.parse(data);
  }
  async list(
    cond: BrandCondDTO,
    paging: PagingDTO
  ): Promise<Brand[]> {
    let data = await this.repository.list(cond, paging);

    return data ? data.map((item) => BrandSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let Brand = await this.repository.get(id);
    if (!Brand || Brand.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
