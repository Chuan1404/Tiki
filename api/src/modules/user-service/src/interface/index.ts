import { PagingDTO } from "devchu-common";
import { IRepository } from "devchu-common/interface/repository.interface";
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
  getByEmail(email: string): Promise<User | null>;
  list(cond: UserCondDTO, paging: PagingDTO): Promise<User[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}