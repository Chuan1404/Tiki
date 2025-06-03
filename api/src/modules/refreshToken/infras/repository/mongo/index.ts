import { MongooseRepository } from "@shared/repository/MongooseRepository";
import { RefreshToken } from "../../../model";
import { RefreshTokenCondDTO, RefreshTokenUpdateDTO } from "../../../model/dto";

export default class RefreshTokenMongooseRepository extends MongooseRepository<
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO
> {}
