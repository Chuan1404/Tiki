import { IRepository } from "../../../share/interface/repository.interface";
import { PagingDTO } from "../../../share/model/paging";
import { Cart, Product } from "../model";
import {
  CartCondDTO,
  CartCreateDTO,
  CartUpdateDTO,
  ProductCondDTO
} from "../model/dto";

export interface ICartRepository
  extends IRepository<Cart, CartCondDTO, CartUpdateDTO> { }

export interface ICartUseCase {
  create(data: CartCreateDTO): Promise<string>;
  update(id: string, data: CartUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Cart | null>;
  list(cond: CartCondDTO, paging: PagingDTO): Promise<Cart[]>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface IProductQueryRepository {
  get(id: string): Promise<Product | null>;
  list(cond: ProductCondDTO): Promise<Product[]>;
}
