import { EModelStatus, PagingDTO } from "devchu-common";
import { v7 } from "uuid";
import { ICartRepository, ICartUseCase } from "../interface";
import { Cart, CartSchema } from "../model";
import {
    CartCondDTO,
    CartCreateDTO,
    CartCreateSchema,
    CartUpdateDTO,
    CartUpdateSchema,
} from "../model/dto";
import { Cart_ExistedError, Cart_InvalidError, Cart_NotFoundError } from "../model/error";

export class CartUseCase implements ICartUseCase {
    constructor(private readonly repository: ICartRepository) {}

    async create(data: CartCreateDTO): Promise<string> {
        const { success, data: parsedData, error } = CartCreateSchema.safeParse(data);

        if (!success) {
            throw Cart_InvalidError;
        }

        const isExisted = await this.repository.findByCond({
            userId: parsedData.userId,
            productId: parsedData.productId,
        });

        if (isExisted) {
            throw Cart_ExistedError;
        }

        let newId = v7();
        const cart: Cart = {
            id: newId,
            productId: parsedData.productId,
            quantity: parsedData.quantity,
            userId: parsedData.userId,
            status: EModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await this.repository.insert(cart);

        return newId;
    }
    async update(id: string, data: CartUpdateDTO): Promise<boolean> {
        const { success, data: parsedData, error } = CartUpdateSchema.safeParse(data);

        if (!success) {
            throw Cart_InvalidError;
        }

        const cart = await this.repository.get(id);

        if (!cart || cart.status === EModelStatus.DELETED) {
            throw Cart_InvalidError;
        }

        return await this.repository.update(id, parsedData);
    }
    async get(id: string): Promise<Cart | null> {
        const data = await this.repository.get(id);

        if (!data || data.status === EModelStatus.DELETED) {
            throw Cart_NotFoundError;
        }

        return CartSchema.parse(data);
    }
    async list(cond: CartCondDTO, paging: PagingDTO): Promise<Cart[]> {
        const data = await this.repository.list(cond, paging);

        return data ? data.map((item) => CartSchema.parse(item)) : [];
    }
    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        const cart = await this.repository.get(id);
        if (!cart || cart.status === EModelStatus.DELETED) {
            throw Cart_NotFoundError;
        }

        return await this.repository.delete(id, isHard);
    }
}
