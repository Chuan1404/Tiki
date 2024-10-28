import { UserPayloadDTO, UserTokenDTO } from "../../modules/user/model/dto";

export interface IJwt {
    verifyToken(token: string): UserPayloadDTO;
    generateToken(payload: UserPayloadDTO, options: Object): UserTokenDTO,
}