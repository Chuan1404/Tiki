import { Request, Response } from "express";
import { IBrandQueryRepository, ICategoryQueryRepository, IProductUseCase } from "../../interface";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { ProductCondScheme, ProductCreateDTO } from "../../model/dto";

export class ProductHttpService {
  constructor(
    private readonly useCase: IProductUseCase,
    private readonly categoryRepository: ICategoryQueryRepository,
    private readonly brandRepository: IBrandQueryRepository
  ) {}

  async create(req: Request, res: Response) {
    try {
      const body: ProductCreateDTO = {
        ...req.body,
        price: Number.parseFloat(req.body.price),
      };
      const result = await this.useCase.create(body);
      res.status(201).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let product = await this.useCase.get(id);

      if (product) {
        const category = await this.categoryRepository.get(product.categoryId);
        product.category = category

        const brand = await this.brandRepository.get(product.brandId!);
        product.brand = brand
      }

      res.status(200).json({
        data: product,
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

    let cond = ProductCondScheme.parse(req.query);
    let result = await this.useCase.list(cond, paging);

    res.status(200).json({
      data: result,
      paging,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.useCase.delete(id);

    res.status(200).json({
      data: id,
    });
  }
}
