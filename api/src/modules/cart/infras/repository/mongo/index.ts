import { MongooseRepository } from "@shared/repository/MongooseRepository";
import { Cart } from "../../../model";
import { CartCondDTO, CartUpdateDTO } from "../../../model/dto";

export default class CartMongooseRepository extends MongooseRepository<
  Cart,
  CartCondDTO,
  CartUpdateDTO
> {}
