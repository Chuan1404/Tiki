import { Request, Response } from "express";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { IUserUseCase } from "../../interface";
import { UserCondScheme } from "../../model/dto";

export class UserHttpService {
    constructor(private readonly useCase: IUserUseCase) {}

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
            let User = await this.useCase.get(id);

            res.status(200).json({
                data: User,
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

        let cond = UserCondScheme.parse(req.query);
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

    async login(req: Request, res: Response) {
        try {
            let token = await this.useCase.login(req.body);

            res.status(200).json({
                data: token,
            });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                res.status(401).json({
                    error: "Unauthorization",
                });
                return;
            }

            const token = authorizationHeader.split(" ")[1];

            const payload = await this.useCase.verifyToken(token);
            const user = await this.useCase.get(payload?.id!);
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async refreshToken(req: Request, res: Response) {
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
}
