import { IRepository } from "@shared/interface/repository.interface";
import { PagingDTO } from "@shared/model/paging";
import { User } from "../model";
import {
  UserCondDTO,
  UserCreateDTO,
  UserUpdateDTO,
} from "../model/dto";

export interface IUserReposity
  extends IRepository<User, UserCondDTO, UserUpdateDTO> { }

export interface IUserUseCase {
  create(data: UserCreateDTO): Promise<string>;
  update(id: string, data: UserUpdateDTO): Promise<boolean>;
  get(id: string): Promise<User | null>;
  list(cond: UserCondDTO, paging: PagingDTO): Promise<User[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
  // register(data: UserCreateDTO): Promise<string>;
  // login(data: UserLoginDTO): Promise<UserTokenDTO>;
  // verifyToken(token: string): Promise<UserPayloadDTO | null>
}