import { Request, Response } from "express";
import { ICategoryUseCase } from "../../interface";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { CategoryCondScheme } from "../../model/dto";

export class CategoryHttpService {
  constructor(private readonly useCase: ICategoryUseCase) { }

  async create(req: Request, res: Response) {
    try {
      const result = await this.useCase.create(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let category = await this.useCase.get(id);

      res.status(200).json({
        data: category,
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

    let cond = CategoryCondScheme.parse(req.query);
    let result = await this.useCase.list(cond, paging);

    res.status(200).json({
      data: result,
      paging,
    });
  }

  async findMany(req: Request, res: Response) {
    let cond = CategoryCondScheme.parse(req.query);
    let result = await this.useCase.list(cond);

    res.status(200).json({
      data: result,
    });
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.useCase.delete(id);

      res.status(200).json({
        data: id,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }

  }
}
