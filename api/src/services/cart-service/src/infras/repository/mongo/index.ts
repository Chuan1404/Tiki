import { MongooseRepository } from "devchu-common";
import { Cart } from "../../../model";
import { CartCondDTO, CartUpdateDTO } from "../../../model/dto";

export default class CartMongooseRepository extends MongooseRepository<
    Cart,
    CartCondDTO,
    CartUpdateDTO
> {}
