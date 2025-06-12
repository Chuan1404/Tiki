import axios from "axios";
import AppError from "devchu-common/errors/AppError";
import { IUserRepository } from "../../interface";
import { User, UserCondDTO, UserCreateDTO } from "../../model/dto";

export class RPCUserRepository implements IUserRepository {
    constructor(private readonly baseURL: string) {}

    async create(data: UserCreateDTO): Promise<string> {
        try {
            const { data: response } = await axios.post(`${this.baseURL}/rpc/user`, { ...data });
            return response.data.id;
        } catch (error: any) {
            const { message } = error.response.data;
            throw new AppError(message, error.status);
        }
    }

    async getByCond(cond: UserCondDTO): Promise<User | null> {
        const { data: response } = await axios.get(`${this.baseURL}/rpc/user/getByCond`, {
            data: cond,
        });
        return response.data || null;
    }
}
