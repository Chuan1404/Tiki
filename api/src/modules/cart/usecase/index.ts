import { v7 } from "uuid";
import { EModelStatus } from "../../../share/model/enums";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/errors";
import { PagingDTO } from "../../../share/model/paging";
import { ICartRepository, ICartUseCase } from "../interface";
import { Cart, CartSchema } from "../model";
import {
  CartCondDTO,
  CartCreateDTO,
  CartCreateSchema,
  CartUpdateDTO,
  CartUpdateSchema,
} from "../model/dto";

export class CartUsecase implements ICartUseCase {
  constructor(private readonly repository: ICartRepository) {}

  async create(data: CartCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = CartCreateSchema.safeParse(data);

    if (!success) {
      throw new Error(error.message);
    }

    const isExisted = await this.repository.findByCond({
      userId: parsedData.userId,
      productId: parsedData.productId
    });

    if (isExisted) {
      throw ErrDataExisted;
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
    const {
      success,
      data: parsedData,
      error,
    } = CartUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let Cart = await this.repository.get(id);

    if (!Cart || Cart.status === EModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }
  async get(id: string): Promise<Cart | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return CartSchema.parse(data);
  }
  async list(
    cond: CartCondDTO,
    paging: PagingDTO
  ): Promise<Cart[]> {
    let data = await this.repository.list(cond, paging);

    return data ? data.map((item) => CartSchema.parse(item)) : [];
  }
  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let Cart = await this.repository.get(id);
    if (!Cart || Cart.status === EModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
