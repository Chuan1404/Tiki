import { AuthLoginDTO, AuthPayloadDTO, AuthRegisterDTO, AuthTokenDTO } from "../model/dto";

export interface IAuthUseCase {
  register(data: AuthRegisterDTO): Promise<string>;
  login(data: AuthLoginDTO): Promise<AuthTokenDTO>;
  verifyToken(token: string): Promise<AuthPayloadDTO | null>;
  refreshToken(token: string): Promise<AuthTokenDTO>;
}