import { Request, Response } from "express";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { ICartUseCase, IProductQueryRepository } from "../../interface";
import { CartCondScheme, CartCreateDTO, CartDeleteDTO } from "../../model/dto";
import { entitiesToHashMap } from "../../../../share/utils";

export class CartHttpService {
  constructor(
    private readonly useCase: ICartUseCase,
    private readonly productRepository: IProductQueryRepository
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body: CartCreateDTO = {
        ...req.body,
        userId: req.userId,
      };
      const result = await this.useCase.create(body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let cart = await this.useCase.get(id);

      res.status(200).json({
        data: cart,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async myCart(req: Request, res: Response) {
    try {
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

      const cond = CartCondScheme.parse({
        ...req.query,
        userId: req.userId,
      });
      let carts = await this.useCase.list(cond, paging);

      // get ids
      const productIds: string[] = carts.map((item) => item.productId) || [];

      // fetch data and convert to hashMap
      const products = await this.productRepository.list({ id: productIds });
      const productsMap = entitiesToHashMap(products);

      carts = carts.map(item => ({
        ...item,
        product: productsMap[item.productId]
      }))
      res.status(200).json({
        data: carts,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.useCase.update(id, req.body);
      res.status(200).json({
        data: id,
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

    const cond = CartCondScheme.parse(req.query);
    let carts = await this.useCase.list(cond, paging);

    res.status(200).json({
      data: carts,
      paging,
    });
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await this.useCase.delete(id, true);
  
      res.status(200).json({
        data: id,
      });
    } catch(error) {
      res.status(400).json({
        error: (error as Error).message
      })
    }
  }
}