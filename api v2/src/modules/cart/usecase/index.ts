import { v7 } from "uuid";
import { ErrDataNotFound } from "../../../share/model/errors";
import { PagingDTO } from "../../../share/model/paging";
import { ICartReposity, ICartUseCase } from "../interface";
import { Cart, CartSchema } from "../model";
import {
  CartCondDTO,
  CartDeleteDTO,
  CartUpdateDTO,
  CartUpdateSchema,
} from "../model/dto";

export class CartUsecase implements ICartUseCase {
  constructor(private readonly repository: ICartReposity) {}

  async createOrupdate(data: CartUpdateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = CartUpdateSchema.safeParse(data);

    if (!success) {
      throw new Error(error.message);
    }

    let productId = parsedData.productId;
    let userId = parsedData.userId;
    let quantity = parsedData.quantity;

    let cart = await this.repository.findByCond({
      productId,
      userId,
    });
    let id;

    if (cart) {
      await this.repository.update(cart.id, { quantity });
      id = cart.id;
    } else {
      id = v7();
      let insertData: Cart = {
        id,
        productId: parsedData.productId as string,
        userId: parsedData.userId as string,
        quantity: parsedData.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.repository.insert(insertData);
    }

    return id;
  }

  async list(cond: CartCondDTO, paging: PagingDTO): Promise<Cart[] | null> {
    let data = await this.repository.list(cond, paging);

    return data ? data.map((item) => CartSchema.parse(item)) : [];
  }

  async delete(data: CartDeleteDTO): Promise<boolean> {
    let cart = await this.repository.findByCond(data);
    if (!cart) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(cart.id, true);
  }
}
