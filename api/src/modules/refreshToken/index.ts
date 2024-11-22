import { Router } from "express";
import { authToken } from "../../share/middleware/OAuth2";
import { RefreshTokenRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/dto";
import { RefreshTokenHttpService } from "./infras/transport/express";
import { RefreshTokenUsecase } from "./usecase";

export const setUpRefreshTokenModule = () => {
  init();

  const repository = new RefreshTokenRepository(modelName);
  const usecase = new RefreshTokenUsecase(repository);
  const httpService = new RefreshTokenHttpService(usecase);

  const router = Router();

  router.post("/refresh-token/refresh", httpService.refresh.bind(httpService));
  // router.post("/refresh-token", httpService.create.bind(httpService));

  return router;
};
