import { IComparePassword, IHashPassword, EUserRole } from "devchu-common";
import jwt from "jsonwebtoken";
import { IAuthUseCase } from "../interface";
import {
    AuthLoginDTO,
    AuthLoginSchema,
    AuthPayloadDTO,
    AuthRegisterDTO,
    AuthRegisterSchema,
    AuthTokenDTO,
} from "../model/dto";
import { Auth_Error, AuthRegister_InvalidError } from "../model/error";

export class AuthUseCase implements IAuthUseCase {
    constructor(
        private readonly passwordHasher: IHashPassword,
        private readonly comparePassword: IComparePassword
    ) // private readonly messageBroker: IMessageBroker
    {}

    async register(data: AuthRegisterDTO): Promise<string> {
        let { success, data: parsedData, error } = AuthRegisterSchema.safeParse(data);

        if (!success) {
            const errorMessage = error?.errors[0].message || "Invalid registration data";
            throw AuthRegister_InvalidError(errorMessage);
        }

        const hashedPassword = this.passwordHasher.hash(parsedData!.password);
        const userDTO = {
            name: parsedData!.name,
            email: parsedData!.email,
            password: hashedPassword,
        };

        // send user data by message broker

        return "newUserId";
    }

    async login(data: AuthLoginDTO): Promise<AuthTokenDTO> {
        let { success, data: parsedData } = AuthLoginSchema.safeParse(data);

        if (!success) {
            throw Auth_Error;
        }

        // Event Bus publish login event

        // if correct, return token
        const user = { id: "", email: "", role: EUserRole.USER };
        const payload: AuthPayloadDTO = {
            id: user.id,
            email: user.email,
            role: user.role,
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

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
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
