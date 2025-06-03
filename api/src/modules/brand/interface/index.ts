import { IRepository } from "@shared/interface/repository.interface";
import { PagingDTO } from "@shared/model/paging";
import { Brand } from "../model";
import {
  BrandCondDTO,
  BrandCreateDTO,
  BrandUpdateDTO,
} from "../model/dto";

export interface IBrandReposity
  extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> {}

export interface IBrandUseCase {
  create(data: BrandCreateDTO): Promise<string>;
  update(id: string, data: BrandUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Brand | null>;
  list(cond: BrandCondDTO, paging?: PagingDTO): Promise<Brand[]>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}
