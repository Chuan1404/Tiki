import { IMessageListener } from "devchu-common";
import { UserCreateDTO } from "../../model/dto";
import { IUserUseCase } from "../../interface";

export class AuthRegisteredHandler implements IMessageListener {

    constructor(private readonly usecase: IUserUseCase) {}
    async handle(data: any): Promise<void> {
        console.log("UserHttpService: User registered", data);
        const userCreateDTO: UserCreateDTO = {
            name: data.name,
            email: data.email,
            password: data.password,
        }

        await this.usecase.create(userCreateDTO);
    }
} 