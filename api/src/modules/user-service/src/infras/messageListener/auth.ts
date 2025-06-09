import { IMessageListener } from "devchu-common";
import { IUserUseCase } from "../../interface";
import { UserCreateDTO } from "../../model/dto";

export class AuthRegisteredHandler implements IMessageListener {
    constructor(private readonly usecase: IUserUseCase) {}
    async handle(data: any): Promise<any> {
        const userCreateDTO: UserCreateDTO = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        try {
            const id = await this.usecase.create(userCreateDTO);
            return id;
        } catch (error) {
            throw error;
        }
    }
}

export class AuthGetByEmailHandler implements IMessageListener {
    constructor(private readonly usecase: IUserUseCase) {}

    async handle(data: any): Promise<any> {
        const user = await this.usecase.getByEmail(data.email);
        return user;
    }
}
