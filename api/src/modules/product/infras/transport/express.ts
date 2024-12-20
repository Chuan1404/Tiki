import { Request, Response } from "express";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { entitiesToHashMap } from "../../../../share/utils";
import { IBrandQueryRepository, ICategoryQueryRepository, IProductUseCase } from "../../interface";
import { ProductCondScheme, ProductCreateDTO } from "../../model/dto";

export class ProductHttpService {
  constructor(
    private readonly useCase: IProductUseCase,
    private readonly categoryRepository: ICategoryQueryRepository,
    private readonly brandRepository: IBrandQueryRepository
  ) { }

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

    const cond = ProductCondScheme.parse(req.query);
    let products = await this.useCase.list(cond, paging);

    // get ids
    const brandIds: string[] = products
      .map(item => item.brandId)
      .filter(brandId => brandId !== undefined);
    const categoryIds: string[] = products.map(item => item.categoryId)


    // fetch data and convert to hashMap
    const brands = await this.brandRepository.list({ id: brandIds })
    const brandsMap = entitiesToHashMap(brands)

    const categories = await this.categoryRepository.list({ id: categoryIds })
    const categoriesMap = entitiesToHashMap(categories)

    // map data
    products = products.map(item => ({
      ...item, brand: item.brandId ? brandsMap[item.brandId] : null,
      category: categoriesMap[item.categoryId]
    }))

    res.status(200).json({
      data: products,
      paging,
    });
  }

  async findMany(req: Request, res: Response) {
    let cond = ProductCondScheme.parse(req.query);
    let result = await this.useCase.list(cond);

    res.status(200).json({
      data: result,
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
