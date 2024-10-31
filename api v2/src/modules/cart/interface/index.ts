import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { Cart } from "../model";
import {
  CartCondDTO,
  CartCreateDTO,
  CartUpdateDTO
} from "../model/dto";

export interface ICartReposity
  extends IRepository<Cart, CartCondDTO, CartUpdateDTO> { }

export interface ICartUseCase {
  create(data: CartCreateDTO): Promise<string>;
  update(id: string, data: CartUpdateDTO): Promise<boolean>;
  get(id: string): Promise<Cart | null>;
  list(cond: CartCondDTO, paging: PagingDTO): Promise<Cart[] | null>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}
