import { MongooseRepository } from "../../../../share/repository/MongooseRepository";
import { Cart } from "../../model";
import { CartCondDTO, CartUpdateDTO } from "../../model/dto";

export class CartRepository extends MongooseRepository<
  Cart,
  CartCondDTO,
  CartUpdateDTO
> {}
