import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrUnAuthentication } from "../../../../share/model/errors";
import { IRefreshTokenUseCase } from "../../interface";
import { RefreshTokenCondDTO, RefreshTokenCreateDTO } from "../../model/dto";

export class RefreshTokenHttpService {
  constructor(private readonly useCase: IRefreshTokenUseCase) { }

  // async create(req: Request, res: Response) {
  //   try {
  //     const response = await this.useCase.create(req.body);

  //     res.status(201).json({ data: response });
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message });
  //   }
  // }

  async refresh(req: Request, res: Response) {
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
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
