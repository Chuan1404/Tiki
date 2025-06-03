import { EUserRole } from "@shared/model/enums";
import jwt from "jsonwebtoken";
import { IAuthUseCase } from "../interface";
import { AuthLoginDTO, AuthLoginSchema, AuthPayloadDTO, AuthRegisterDTO, AuthTokenDTO } from "../model/dto";
import { Auth_Error } from "../model/error";

export class AuthUseCase implements IAuthUseCase {
    constructor() {}

    async register(data: AuthRegisterDTO): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async login(data: AuthLoginDTO): Promise<AuthTokenDTO> {
        let { success, data: parsedData } = AuthLoginSchema.safeParse(data);

        if (!success) {
            throw Auth_Error;
        }

        // Event Bus publish login event

        // if correct, return token
        const user = {id: '', email: '', role: EUserRole.USER};
        const payload: AuthPayloadDTO = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

        let accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: accessTokenLife,
        });
        let refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: refreshTokenLife,
        });

        const responseData: AuthTokenDTO = {
            accessToken,
            refreshToken,
        };

        return responseData;
    }

    async verifyToken(token: string): Promise<AuthPayloadDTO | null> {
        if (!token) {
            throw new Error("Missing token");
        }

        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
        let decoded = jwt.verify(token, accessTokenSecret) as AuthPayloadDTO;

        if (!decoded) {
            throw Auth_Error;
        }

        return decoded;
    }

    async refreshToken(token: string): Promise<AuthTokenDTO> {
        throw new Error("Method not implemented.");
    }
}
