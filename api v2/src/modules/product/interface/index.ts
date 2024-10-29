import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { Brand, Category, Product } from "../model";
import {
  ProductCondDTO,
  ProductCreateDTO,
  ProductUpdateDTO,
} from "../model/dto";

export interface IProductReposity
  extends IRepository<Product, ProductCondDTO, ProductUpdateDTO> {}

export interface IProductUseCase {
  create(data: ProductCreateDTO): Promise<string>;
  update(id: string, data: ProductUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Product | null>;
  list(cond: ProductCondDTO, paging: PagingDTO): Promise<Product[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}

export interface ICategoryQueryRepository {
  get(id: string): Promise<Category | null>;
}

export interface IBrandQueryRepository {
  get(id: string): Promise<Brand | null>;
}
