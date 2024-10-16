import { MongooseRepository } from "../../../../share/repository/MongooseRepository";
import { User } from "../../model";
import { UserCondDTO, UserUpdateDTO } from "../../model/dto";

export class UserRepository extends MongooseRepository<
  User,
  UserCondDTO,
  UserUpdateDTO
> {}
