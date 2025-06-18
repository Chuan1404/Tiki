// import { IMessageListener } from "devchu-common";
// import { IUserUseCase } from "../../interface";
// import { UserCreateDTO } from "../../model/dto";

// export class UserCreatedHandler implements IMessageListener {
//     constructor(private readonly usecase: IUserUseCase) {}

//     async handle(data: any): Promise<any> {
//         const userCreateDTO: UserCreateDTO = {
//             name: data.name,
//             email: data.email,
//             password: data.password,
//         };

//         const id = await this.usecase.create(userCreateDTO);
//         return id;
//     }
// }

// export class UserGetByEmailHandler implements IMessageListener {
//     constructor(private readonly usecase: IUserUseCase) {}

//     async handle(data: any): Promise<any> {
//         const user = await this.usecase.getByCond(data);
//         return user;
//     }
// }
