import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { Category } from "../model";
import {
  CategoryCondDTO,
  CategoryCreateDTO,
  CategoryUpdateDTO,
} from "../model/dto";

export interface ICategoryRepository
  extends IRepository<Category, CategoryCondDTO, CategoryUpdateDTO> {}

export interface ICategoryUseCase {
  create(data: CategoryCreateDTO): Promise<string>;
  update(id: string, data: CategoryUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Category | null>;
  list(cond: CategoryCondDTO, paging?: PagingDTO): Promise<Category[]>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}
