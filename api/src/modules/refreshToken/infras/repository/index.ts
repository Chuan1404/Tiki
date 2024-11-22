import { MongooseRepository } from "../../../../share/repository/MongooseRepository";
import { RefreshToken } from "../../model";
import { RefreshTokenCondDTO, RefreshTokenUpdateDTO } from "../../model/dto";

export class RefreshTokenRepository extends MongooseRepository<
  RefreshToken,
  RefreshTokenCondDTO,
  RefreshTokenUpdateDTO
> {}
