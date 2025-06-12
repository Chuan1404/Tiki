import { PagingDTO } from "devchu-common";
import { IRepository } from "devchu-common/interface/repository.interface";

// export interface IUserReposity extends IRepository<User, UserCondDTO, UserUpdateDTO> {}

export interface IMailUseCase {
    sendMail(toEmail: string, subject: string, html: string): Promise<boolean>;
}
