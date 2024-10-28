import { UserPayloadDTO, UserTokenDTO } from "../../modules/user/model/dto";
import {
  ErrMissingToken,
  ErrUnAuthentication,
} from "../../modules/user/model/error";
import { IJwt } from "../interface/IJwt";
import jwt from "jsonwebtoken";

export default class Jwt implements IJwt {
  verifyToken(token: string): UserPayloadDTO {
    if (!token) {
      throw ErrMissingToken;
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
    let decoded = jwt.verify(token, accessTokenSecret) as UserPayloadDTO;

    if (!decoded) {
      throw ErrUnAuthentication;
    }

    return decoded;
  }

  generateToken(payload: UserPayloadDTO): UserTokenDTO {
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

    let accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: accessTokenLife,
    });
    let refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: refreshTokenLife,
    });

    let data: UserTokenDTO = {
      accessToken,
      refreshToken,
    };
    return data;
  }
}
