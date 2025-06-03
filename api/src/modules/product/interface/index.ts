import { IRepository } from "@shared/interface/repository.interface";
import { PagingDTO } from "@shared/model/paging";
import { Brand, Category, Product } from "../model";
import {
  BrandCondDTO,
  CategoryCondDTO,
  ProductCondDTO,
  ProductCreateDTO,
  ProductUpdateDTO,
} from "../model/dto";

export interface IProductRepository
  extends IRepository<Product, ProductCondDTO, ProductUpdateDTO> {}

export interface IProductUseCase {
  create(data: ProductCreateDTO): Promise<string>;
  update(id: string, data: ProductUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Product | null>;
  list(cond: ProductCondDTO, paging?: PagingDTO): Promise<Product[]>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}

export interface ICategoryQueryRepository {
  get(id: string): Promise<Category | null>;
  list(cond: CategoryCondDTO): Promise<Category[]>;
}

export interface IBrandQueryRepository {
  get(id: string): Promise<Brand | null>;
  list(cond: BrandCondDTO): Promise<Brand[]>;
}
