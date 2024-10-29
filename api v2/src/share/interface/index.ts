import { UserPayloadDTO, UserTokenDTO } from "../../modules/user/model/dto";
import { PagingDTO } from "../model/paging";

// repository
export interface IQueryRepository<Entity, Cond> {
  get(id: string): Promise<Entity | null>;
  findByCond(cond: Cond): Promise<Entity | null>;
  list(cond: Cond, paging: PagingDTO): Promise<Entity[] | null>;
}

export interface ICommandRepository<Entity, UpdateDTO> {
  insert(data: Entity): Promise<boolean>;
  update(id: string, data: UpdateDTO): Promise<boolean>;
  delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface IRepository<Entity, Cond, UpdateDTO>
  extends IQueryRepository<Entity, Cond>,
    ICommandRepository<Entity, UpdateDTO> {}

// password

export interface IHashPassword {
  hash(rawPassword: string): string;
}

export interface IComparePassword {
  compare(rawPassword: string, hashedPassword: string): boolean;
}

// jwt
// export interface IJwt {
//   verifyToken(token: string): UserPayloadDTO;
//   generateToken(payload: UserPayloadDTO, options: Object): UserTokenDTO;
// }
