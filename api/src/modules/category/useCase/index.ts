import { v7 } from "uuid";
import { EModelStatus } from "../../../share/model/enums";
import { PagingDTO } from "../../../share/model/paging";
import { ICategoryRepository, ICategoryUseCase } from "../interface";
import { Category, CategorySchema } from "../model";
import {
  CategoryCondDTO,
  CategoryCreateDTO,
  CategoryCreateSchema,
  CategoryUpdateDTO,
  CategoryUpdateSchema,
} from "../model/dto";
import { ErrDataExisted, ErrDataInvalid, ErrDataNotFound } from "../../../share/model/errors";


export class CategoryUseCase implements ICategoryUseCase {
  constructor(private readonly repository: ICategoryRepository) {}

  async create(data: CategoryCreateDTO): Promise<string> {
    const { success, data: parsedData } = CategoryCreateSchema.safeParse(data);

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
    const {
      success,
      data: parsedData,
      error,
    } = CategoryUpdateSchema.safeParse(data);

    if (!success) {
      throw new Error(error.message);
    }

    const category = await this.repository.get(id);

    if (!category || category.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }
  async get(id: string): Promise<Category | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return CategorySchema.parse(data);
  }
  async list(
    cond: CategoryCondDTO,
    paging?: PagingDTO
  ): Promise<Category[]> {
    let data = await this.repository.list(cond, paging);

    return data ? data.map((item) => CategorySchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let Category = await this.repository.get(id);
    if (!Category || Category.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
