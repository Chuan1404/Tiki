import { MongooseRepository } from "@shared/repository/MongooseRepository";
import { Product } from "../../../model";
import { ProductCondDTO, ProductUpdateDTO } from "../../../model/dto";

export default class ProductMongooseRepository extends MongooseRepository<
  Product,
  ProductCondDTO,
  ProductUpdateDTO
> {}
