import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IRefreshTokenUseCase } from "../../interface";

export class RefreshTokenHttpService {
  constructor(private readonly useCase: IRefreshTokenUseCase) { }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshTokenSecret =
        process.env.REFRESH_TOKEN_SECRET ?? "refreshToken";
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessToken";
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE ?? "1h";

      const decoded = jwt.verify(req.body.token, refreshTokenSecret) as JwtPayload

      if (!decoded) {
        throw new Error("Token is expired");
      }

      const payload = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      }

      const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: accessTokenLife,
      });

      res.status(201).json({ data: accessToken });
    } catch (error) {
      next(error)
    }
  }
}
