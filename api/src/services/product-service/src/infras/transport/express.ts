import { PagingDTOSchema } from "devchu-common";
import { entitiesToHashMap } from "devchu-common/utils";
import { NextFunction, Request, Response } from "express";
import { IBrandQueryRepository, ICategoryQueryRepository, IProductUseCase } from "../../interface";
import { ProductCondScheme, ProductCreateDTO } from "../../model/dto";

export class ProductHttpService {
    constructor(
        private readonly useCase: IProductUseCase,
        private readonly CategoryPrismaRepository: ICategoryQueryRepository,
        private readonly brandRepository: IBrandQueryRepository
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: ProductCreateDTO = {
                ...req.body,
                price: Number.parseFloat(req.body.price),
            };
            const result = await this.useCase.create(body);
            res.status(201).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const product = await this.useCase.get(id);

            if (product) {
                const category = await this.CategoryPrismaRepository.get(product.categoryId);
                product.category = category;

                const brand = await this.brandRepository.get(product.brandId!);
                product.brand = brand;
            }

            res.status(200).json({
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            await this.useCase.update(id, req.body);
            res.status(200).json({
                data: id,
            });
        } catch (error) {
            next(error);
        }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query);

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
            .map((item) => item.brandId)
            .filter((brandId) => brandId !== undefined);
        const categoryIds: string[] = products.map((item) => item.categoryId);

        // fetch data and convert to hashMap
        const brands = await this.brandRepository.list({ id: brandIds });
        const brandsMap = entitiesToHashMap(brands);

        const categories = await this.CategoryPrismaRepository.list({
            id: categoryIds,
        });
        const categoriesMap = entitiesToHashMap(categories);

        // map data
        products = products.map((item) => ({
            ...item,
            brand: item.brandId ? brandsMap[item.brandId] : null,
            category: categoriesMap[item.categoryId],
        }));

        res.status(200).json({
            data: products,
            paging,
        });
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        let cond = ProductCondScheme.parse(req.query);
        let result = await this.useCase.list(cond);

        res.status(200).json({
            data: result,
        });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await this.useCase.delete(id);

            res.status(200).json({
                data: id,
            });
        } catch (error) {
            next(error);
        }
    }
}
