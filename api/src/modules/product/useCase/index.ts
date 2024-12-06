import { v7 } from "uuid";
import { EModelStatus } from "../../../share/model/enums";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/errors";
import { PagingDTO } from "../../../share/model/paging";
import { IProductRepository, IProductUseCase } from "../interface";
import { Product, ProductSchema } from "../model";
import {
  ProductCondDTO,
  ProductCreateDTO,
  ProductCreateSchema,
  ProductUpdateDTO,
  ProductUpdateSchema,
} from "../model/dto";

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
      throw ErrDataExisted;
    }

    let newId = v7();
    const Product: Product = {
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

    await this.repository.insert(Product);

    return newId;
  }
  async update(id: string, data: ProductUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = ProductUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let Product = await this.repository.get(id);

    if (!Product || Product.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }
  async get(id: string): Promise<Product | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return ProductSchema.parse(data);
  }
  async list(
    cond: ProductCondDTO,
    paging?: PagingDTO
  ): Promise<Product[]> {
    let data = await this.repository.list(cond, paging);

    return data ? data.map((item) => ProductSchema.parse(item)) : [];
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let Product = await this.repository.get(id);
    if (!Product || Product.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
