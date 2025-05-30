import jwt from "jsonwebtoken";
import { v7 } from "uuid";
import { EModelStatus, EUserRole } from "../../../share/model/enums";
import { PagingDTO } from "../../../share/model/paging";
import { IUserReposity, IUserUseCase } from "../interface";
import { User, UserSchema } from "../model";
import {
    UserCondDTO,
    UserCreateDTO,
    UserCreateSchema,
    UserLoginDTO,
    UserLoginSchema,
    UserPayloadDTO,
    UserTokenDTO,
    UserUpdateDTO,
    UserUpdateSchema,
} from "../model/dto";
import {
    User_ExistedError,
    User_InvalidError,
    User_NotFoundError,
} from "../model/error";
import { IComparePassword, IHashPassword } from "../../../share/interface/password.interface";

export class UserUseCase implements IUserUseCase {
    constructor(
        private readonly repository: IUserReposity,
        private readonly passwordHasher: IHashPassword,
        private readonly comparePassword: IComparePassword
    ) {}

    async create(data: UserCreateDTO): Promise<string> {
        const {
            success,
            data: parsedData,
            error,
        } = UserCreateSchema.safeParse(data);

        if (!success) {
            throw new Error(error.message);
        }

        const isExisted = await this.repository.findByCond({
            email: parsedData.email,
        });

        if (isExisted) {
            throw User_ExistedError;
        }

        const hashedPassword = this.passwordHasher.hash(parsedData.password);

        const newId = v7();
        const user: User = {
            id: newId,
            name: parsedData.name,
            email: parsedData.email,
            password: hashedPassword,
            role: EUserRole.USER,
            status: EModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(user);

        return newId;
    }

    async update(id: string, data: UserUpdateDTO): Promise<boolean> {
        const {
            success,
            data: parsedData,
            error,
        } = UserUpdateSchema.safeParse(data);

        if (!success) {
            throw User_InvalidError;
        }

        let User = await this.repository.get(id);

        if (!User || User.status === EModelStatus.DELETED) {
            throw User_InvalidError;
        }

        return await this.repository.update(id, parsedData);
    }

    async get(id: string): Promise<User | null> {
        let data = await this.repository.get(id);

        if (!data || data.status === EModelStatus.DELETED) {
            throw User_NotFoundError;
        }

        return UserSchema.parse(data);
    }

    async list(cond: UserCondDTO, paging: PagingDTO): Promise<User[] | null> {
        let data = await this.repository.list(cond, paging);

        return data ? data.map((item) => UserSchema.parse(item)) : [];
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        let User = await this.repository.get(id);
        if (!User || User.status === EModelStatus.DELETED) {
            throw User_NotFoundError;
        }

        return await this.repository.delete(id, isHard);
    }

    async register(data: UserCreateDTO): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async login(data: UserLoginDTO): Promise<UserTokenDTO> {
        let { success, data: parsedData } = UserLoginSchema.safeParse(data);

        if (!success) {
            throw User_InvalidError;
        }
        const user = await this.repository.findByCond({
            email: parsedData?.email,
            role: parsedData?.role,
        });

        if (!user) {
            throw new Error("Email or Password incorrect");
        }

        const isValidPassword = this.comparePassword.compare(
            parsedData!.password,
            user.password
        );

        if (!isValidPassword) {
            throw new Error("Email or password is not correct");
        }

        const payload: UserPayloadDTO = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";
        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
        const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE ?? "24h";
        const refreshTokenSecret =
            process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";

        let accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: accessTokenLife,
        });
        let refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: refreshTokenLife,
        });

        const responseData: UserTokenDTO = {
            accessToken,
            refreshToken,
        };

        return responseData;
    }

    async verifyToken(token: string): Promise<UserPayloadDTO | null> {
        if (!token) {
            throw new Error("Missing token");
        }

        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
        let decoded = jwt.verify(token, accessTokenSecret) as UserPayloadDTO;

        if (!decoded) {
            throw new Error("Unauthentication");
        }

        return decoded;
    }
}
