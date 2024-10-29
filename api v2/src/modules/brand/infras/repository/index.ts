import { MongooseRepository } from "../../../../share/repository/MongooseRepository";
import { Brand } from "../../model";
import { BrandCondDTO, BrandUpdateDTO } from "../../model/dto";

export class BrandRepository extends MongooseRepository<
  Brand,
  BrandCondDTO,
  BrandUpdateDTO
> {}
