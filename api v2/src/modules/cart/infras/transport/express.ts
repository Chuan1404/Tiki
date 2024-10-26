import { Request, Response } from "express";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { ICartUseCase } from "../../interface";
import { CartCondScheme, CartDeleteDTO, CartUpdateDTO } from "../../model/dto";

export class CartHttpService {
  constructor(private readonly useCase: ICartUseCase) {}

  async update(req: Request, res: Response) {
    const { productId } = req.params;

    let data: CartUpdateDTO = {
      productId,
      userId: "123",
      quantity: req.body.quantity,
    };

    try {
      await this.useCase.createOrupdate(data);
      res.status(200).json({
        data: productId,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response) {
    const {
      success,
      data: paging,
      error,
    } = PagingDTOSchema.safeParse(req.query);

    if (!success) {
      res.status(400).json({
        error: error.message,
      });
      return;
    }

    let cond = CartCondScheme.parse(req.query);
    let result = await this.useCase.list(cond, paging);

    res.status(200).json({
      data: result,
      paging,
    });
  }

  async delete(req: Request, res: Response) {
    const { productId } = req.params;

    let data: CartDeleteDTO = {
      productId,
      userId: "",
    };

    try {
      await this.useCase.delete(data);
      res.status(200).json({
        data: productId,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
