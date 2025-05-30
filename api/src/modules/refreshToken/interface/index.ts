import { IRepository } from "../../../share/interface/repository.interface";
import { PagingDTO } from "../../../share/model/paging";
import { RefreshToken } from "../model";
import {
  RefreshTokenCondDTO,
  RefreshTokenCreateDTO,
  RefreshTokenUpdateDTO,
} from "../model/dto";

export interface IRefreshTokenReposity
  extends IRepository<RefreshToken, RefreshTokenCondDTO, RefreshTokenUpdateDTO> {}

export interface IRefreshTokenUseCase {
  create(data: RefreshTokenCreateDTO): Promise<string>;
  update(id: string, data: RefreshTokenUpdateDTO): Promise<boolean>;
  get(id: string): Promise<RefreshToken | null>;
  findByCond(cond: RefreshTokenCondDTO): Promise<RefreshToken | null>;
  list(cond: RefreshTokenCondDTO, paging: PagingDTO): Promise<RefreshToken[] | null>;
  delete(id: string, isHard?: boolean): Promise<boolean>;
}
