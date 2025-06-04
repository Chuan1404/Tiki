import { NextFunction, Request, Response } from "express";
import { IAuthUseCase } from "../../interface";

export class AuthHttpService {
    constructor(private readonly useCase: IAuthUseCase) {}

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.useCase.login(req.body);

            res.status(200).json({
                data: token,
            });
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await this.useCase.register(req.body);

            res.status(200).json({
                data: {}
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

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            // await this.useCase.update(id, req.body);
            res.status(200).json({
                data: id,
            });
        } catch (error) {
            next(error);
        }
    }
}
