import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { Cart } from "../model";
import {
  CartCondDTO,
  CartDeleteDTO,
  CartUpdateDTO
} from "../model/dto";

export interface ICartReposity
  extends IRepository<Cart, CartCondDTO, CartUpdateDTO> {}

export interface ICartUseCase {
  createOrupdate(data: CartUpdateDTO): Promise<string>;
  list(cond: CartCondDTO, paging: PagingDTO): Promise<Cart[] | null>;
  delete(data: CartDeleteDTO): Promise<boolean>;
}
