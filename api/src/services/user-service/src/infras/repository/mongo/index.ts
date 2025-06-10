import { MongooseRepository } from "devchu-common";
import { User } from "../../../model";
import { UserCondDTO, UserUpdateDTO } from "../../../model/dto";

export default class UserMongooseRepository extends MongooseRepository<
  User,
  UserCondDTO,
  UserUpdateDTO
> {}
