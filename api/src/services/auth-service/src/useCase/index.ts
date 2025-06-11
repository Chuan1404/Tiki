import { EModelStatus, IComparePassword, IHashPassword } from "devchu-common";
import jwt from "jsonwebtoken";
import { IAuthUseCase, ITokenRepository, IUserRepository } from "../interface";
import {
    AuthLoginDTO,
    AuthLoginSchema,
    AuthPayloadDTO,
    AuthRegisterDTO,
    AuthRegisterSchema,
    AuthTokenDTO,
    Token,
} from "../model/dto";
import { Auth_Error, AuthRegister_InvalidError, AuthToken_InvalidError } from "../model/error";

export class AuthUseCase implements IAuthUseCase {
    constructor(
        private readonly tokenRepository: ITokenRepository,
        private readonly passwordHasher: IHashPassword,
        private readonly comparePassword: IComparePassword,
        private readonly rpcUserRepository: IUserRepository
    ) {}

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

        try {
            const newId = await this.rpcUserRepository.create(userDTO);
            return newId;
        } catch (error: any) {
            throw error;
        }
    }

    async login(data: AuthLoginDTO): Promise<AuthTokenDTO> {
        const { success, data: parsedData } = AuthLoginSchema.safeParse(data);

        if (!success) {
            throw Auth_Error;
        }

        const user = await this.rpcUserRepository.getByCond({ email: parsedData!.email });
        if (!user) {
            throw Auth_Error;
        }

        if (!this.comparePassword.compare(parsedData!.password, user.password)) {
            throw Auth_Error;
        }

        const payload: AuthPayloadDTO = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: accessTokenLife as any,
        });

        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: refreshTokenLife as any,
        });

        const tokenData: Token = {
            token: refreshToken,
            userId: user.id,
            status: EModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await this.tokenRepository.insert(tokenData);

        const responseData: AuthTokenDTO = {
            accessToken,
            refreshToken,
        };

        return responseData;
    }

    async verifyToken(token: string): Promise<AuthPayloadDTO | null> {
        if (!token) {
            throw AuthToken_InvalidError;
        }

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
        let decoded = jwt.verify(token, accessTokenSecret) as AuthPayloadDTO;

        if (!decoded) {
            throw AuthToken_InvalidError;
        }

        return decoded;
    }
}
