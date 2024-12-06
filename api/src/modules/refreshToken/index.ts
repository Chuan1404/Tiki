import { Router } from "express";
import { authToken } from "../../share/middleware/OAuth2";
import { RefreshTokenRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/dto";
import { RefreshTokenHttpService } from "./infras/transport/express";
import { RefreshTokenUseCase } from "./useCase";

export const setUpRefreshTokenModule = () => {
  init();

  const repository = new RefreshTokenRepository(modelName);
  const useCase = new RefreshTokenUseCase(repository);
  const httpService = new RefreshTokenHttpService(useCase);

  const router = Router();

  router.post("/refresh-token/refresh", httpService.refresh.bind(httpService));
  // router.post("/refresh-token", httpService.create.bind(httpService));

  return router;
};
