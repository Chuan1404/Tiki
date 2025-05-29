import { v7 } from "uuid";
import { EModelStatus } from "../../../share/model/enums";
import { PagingDTO } from "../../../share/model/paging";
import { IRefreshTokenReposity, IRefreshTokenUseCase } from "../interface";
import {
    RefreshToken_ExistedError,
    RefreshToken_InvalidError,
    RefreshToken_NotFoundError,
} from "../model/error";
import { RefreshToken, RefreshTokenSchema } from "../model";
import {
    RefreshTokenCondDTO,
    RefreshTokenCreateDTO,
    RefreshTokenCreateSchema,
    RefreshTokenUpdateDTO,
    RefreshTokenUpdateSchema,
} from "../model/dto";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(private readonly repository: IRefreshTokenReposity) {}

    async create(data: RefreshTokenCreateDTO): Promise<string> {
        const {
            success,
            data: parsedData,
            error,
        } = RefreshTokenCreateSchema.safeParse(data);

        if (!success) {
            throw new Error(error.message);
        }

        const isExisted = await this.repository.findByCond({
            token: parsedData.token,
        });

        if (isExisted) {
            throw RefreshToken_ExistedError;
        }

        let newId = v7();
        const refreshToken: RefreshToken = {
            id: newId,
            token: parsedData.token,
            userId: parsedData.userId,
            status: EModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(refreshToken);

        return newId;
    }

    async update(id: string, data: RefreshTokenUpdateDTO): Promise<boolean> {
        const {
            success,
            data: parsedData,
            error,
        } = RefreshTokenUpdateSchema.safeParse(data);

        if (!success) {
            throw RefreshToken_InvalidError;
        }

        let RefreshToken = await this.repository.get(id);

        if (!RefreshToken || RefreshToken.status === EModelStatus.DELETED) {
            throw RefreshToken_InvalidError;
        }

        return await this.repository.update(id, parsedData);
    }

    async get(id: string): Promise<RefreshToken | null> {
        let data = await this.repository.get(id);

        if (!data || data.status === EModelStatus.DELETED) {
            throw RefreshToken_NotFoundError;
        }

        return RefreshTokenSchema.parse(data);
    }

    async findByCond(cond: RefreshTokenCondDTO): Promise<RefreshToken | null> {
        let data = await this.repository.findByCond(cond);

        if (!data || data.status === EModelStatus.DELETED) {
            throw RefreshToken_NotFoundError;
        }

        return RefreshTokenSchema.parse(data);
    }

    async list(
        cond: RefreshTokenCondDTO,
        paging: PagingDTO
    ): Promise<RefreshToken[] | null> {
        let data = await this.repository.list(cond, paging);

        return data ? data.map((item) => RefreshTokenSchema.parse(item)) : [];
    }

    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        let refreshToken = await this.repository.get(id);
        if (!refreshToken || refreshToken.status === EModelStatus.DELETED) {
            throw RefreshToken_NotFoundError;
        }

        return await this.repository.delete(id, isHard);
    }
}
