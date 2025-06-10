import { PagingDTOSchema } from "devchu-common";
import { NextFunction, Request, Response } from "express";
import { IBrandUseCase } from "../../interface";
import { BrandCondScheme } from "../../model/dto";

export class BrandHttpService {
    constructor(private readonly useCase: IBrandUseCase) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.useCase.create(req.body);
            res.status(201).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const brand = await this.useCase.get(id);

            res.status(200).json({
                data: brand,
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

        let cond = BrandCondScheme.parse(req.query);
        let result = await this.useCase.list(cond, paging);

        res.status(200).json({
            data: result,
            paging,
        });
    }

    async findMany(req: Request, res: Response, next: NextFunction) {
        let cond = BrandCondScheme.parse(req.body);
        let result = await this.useCase.list(cond);

        res.status(200).json({
            data: result,
        });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await this.useCase.delete(id);

            res.status(200).json({
                data: id,
            });
        } catch (error) {
            next(error);
        }
    }
}
