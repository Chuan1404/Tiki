import { MongooseRepository } from "../../../../../share/repository/MongooseRepository";
import { Product } from "../../../model";
import { ProductCondDTO, ProductUpdateDTO } from "../../../model/dto";

export default class ProductMongooseRepository extends MongooseRepository<
  Product,
  ProductCondDTO,
  ProductUpdateDTO
> {}
