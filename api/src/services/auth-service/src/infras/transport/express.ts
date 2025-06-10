import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthUseCase } from "../../interface";
import { AuthToken_InvalidError } from "../../model/error";

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
            await this.useCase.register(req.body);
            res.status(200).json({
                message: "User registered successfully",
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
        try {
            const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
            const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";

            const decoded = jwt.verify(req.body.token, refreshTokenSecret) as JwtPayload;

            if (!decoded) {
                throw AuthToken_InvalidError;
            }

            const payload = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            };

            const accessToken = jwt.sign(payload, accessTokenSecret, {
                expiresIn: accessTokenLife as any,
            });

            res.status(201).json({ data: accessToken });
        } catch (error) {
            next(error);
        }
    }
}
