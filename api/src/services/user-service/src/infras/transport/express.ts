import { PagingDTOSchema } from "devchu-common";
import { NextFunction, Request, Response } from "express";
import { IUserUseCase } from "../../interface";
import { UserCondScheme } from "../../model/dto";

export class UserHttpService {
    constructor(private readonly useCase: IUserUseCase) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.useCase.create(req.body);
            res.status(201).json({ data: result });
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const user = await this.useCase.get(id);

            res.status(200).json({
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    async getByCond(req: Request, res: Response, next: NextFunction) {
        try {
            const cond = UserCondScheme.parse(req.body);
            const user = await this.useCase.getByCond(cond);

            res.status(200).json({
                data: user,
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

        let cond = UserCondScheme.parse(req.query);
        let result = await this.useCase.list(cond, paging);

        res.status(200).json({
            data: result,
            paging,
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

    async profile(req: Request, res: Response, next: NextFunction) {
        try {
            // const authorizationHeader = req.headers.authorization;

            // if (!authorizationHeader) {
            //     res.status(401).json({
            //         error: "Unauthorization",
            //     });
            //     return;
            // }

            // const token = authorizationHeader.split(" ")[1];

            // const payload = await this.useCase.verifyToken(token);
            // const user = await this.useCase.get(payload?.id!);
            // res.status(200).json({ data: user });
            res.status(200).json("ok");
        } catch (error) {
            next(error);
        }
    }
}
