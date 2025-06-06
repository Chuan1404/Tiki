import { EModelStatus, EUserRole, IComparePassword, IHashPassword, IMessage, IMessageBroker, PagingDTO } from "devchu-common";
import { v7 } from "uuid";
import { IUserReposity, IUserUseCase } from "../interface";
import { User, UserSchema } from "../model";
import {
    UserCondDTO,
    UserCreateDTO,
    UserCreateSchema,
    UserUpdateDTO,
    UserUpdateSchema
} from "../model/dto";
import { User_ExistedError, User_InvalidError, User_NotFoundError } from "../model/error";

export class UserUseCase implements IUserUseCase {
    constructor(
        private readonly repository: IUserReposity,
        private readonly messageBroker: IMessageBroker
    ) {}

    async create(data: UserCreateDTO): Promise<string> {
        const { success, data: parsedData, error } = UserCreateSchema.safeParse(data);

        if (!success) {
            throw new Error(error.message);
        }

        const isExisted = await this.repository.findByCond({
            email: parsedData.email,
        });

        if (isExisted) {
            throw User_ExistedError;
        }

        const newId = v7();
        const user: User = {
            id: newId,
            name: parsedData.name,
            email: parsedData.email,
            password: parsedData.password,
            role: EUserRole.USER,
            status: EModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(user);

        const message: IMessage = {
            exchange: "user",
            routingKey: "user.created",
            data: {
                id: newId,
                name: parsedData.name,
                email: parsedData.email,
            }
        }
        this.messageBroker.publish(message);

        return newId;
    }

    async update(id: string, data: UserUpdateDTO): Promise<boolean> {
        const { success, data: parsedData, error } = UserUpdateSchema.safeParse(data);

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
}
