import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserPayloadSchema } from "../../modules/user/model/dto";
import { EUserRole } from "../model/enums";

declare global {
    namespace Express {
        export interface Request {
            userId?: string;
            userRole?: EUserRole;
        }
    }
}

export function authToken(req: Request, res: Response, next: NextFunction) {
    let accessToken: string = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";

    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
        res.status(401).json({
            error: "Unauthorize",
        });
        return;
    }

    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, accessToken, (err, data) => {
        if (err) {
            res.status(401).json({
                error: "Unauthorization",
            });
            return;
        }
        const { success, data: parsedData } = UserPayloadSchema.safeParse(data);

        if (!success) {
            res.status(401).json({
                error: "Unauthorization",
            });
            return;
        }

        req.userId = parsedData.id as string;
        req.userRole = parsedData.role as EUserRole;
        next();
    });
}

export function authorizeUser(acceptRoles: EUserRole[] = []) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.userRole) {
            res.status(403).json({
                error: "You dont have permission to access this",
            });
            return;
        }

        if (
            req.userRole === EUserRole.ADMIN ||
            acceptRoles.includes(req.userRole)
        ) {
            next();
            return;
        }
        res.status(403).json({
            error: "You dont have permission to access this",
        });
    };
}
