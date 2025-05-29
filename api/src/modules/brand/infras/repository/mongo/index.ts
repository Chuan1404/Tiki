import { MongooseRepository } from "../../../../../share/repository/MongooseRepository";
import { Brand } from "../../../model";
import { BrandCondDTO, BrandUpdateDTO } from "../../../model/dto";

export default class BrandMongooseRepository extends MongooseRepository<
  Brand,
  BrandCondDTO,
  BrandUpdateDTO
> {}
