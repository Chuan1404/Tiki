import { IRepository } from "devchu-common";
import {
    AuthLoginDTO,
    AuthPayloadDTO,
    AuthRegisterDTO,
    AuthTokenDTO,
    Token,
    TokenCondDTO,
    TokenUpdateDTO,
    User,
    UserCondDTO,
    UserCreateDTO,
} from "../model/dto";

export interface ITokenRepository extends IRepository<Token, TokenCondDTO, TokenUpdateDTO> {}

export interface IAuthUseCase {
    register(data: AuthRegisterDTO): Promise<string>;
    login(data: AuthLoginDTO): Promise<AuthTokenDTO>;
    verifyToken(token: string): Promise<AuthPayloadDTO | null>;
}

export interface IUserRepository {
    create(data: UserCreateDTO): Promise<string>;
    getByCond(cond: UserCondDTO): Promise<User | null>;
}
