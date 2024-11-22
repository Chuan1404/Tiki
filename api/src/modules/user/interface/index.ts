import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { RefreshToken, User } from "../model";
import {
  RefreshTokenCondDTO,
  UserCondDTO,
  UserCreateDTO,
  UserLoginDTO,
  UserPayloadDTO,
  UserTokenDTO,
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
  register(data: UserCreateDTO): Promise<string>;
  login(data: UserLoginDTO): Promise<UserTokenDTO>;
  verifyToken(token: string): Promise<UserPayloadDTO | null>
}

export interface IRefreshTokenQueryRepository {
  create(cond: RefreshTokenCondDTO): Promise<RefreshToken>;
  refresh(token: string): Promise<RefreshToken>
}

