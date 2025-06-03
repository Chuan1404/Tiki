import { Router } from "express";
import { init, modelName } from "./infras/repository/mongo/dto";
import { RefreshTokenHttpService } from "./infras/transport/express";
import { RefreshTokenUseCase } from "./useCase";
import { RefreshTokenMongooseRepository } from "./infras/repository";

export const setUpRefreshTokenModule = () => {
  init();

  const repository = new RefreshTokenMongooseRepository(modelName);
  const useCase = new RefreshTokenUseCase(repository);
  const httpService = new RefreshTokenHttpService(useCase);

  const router = Router();

  router.post("/refresh-token/refresh", httpService.refresh.bind(httpService));
  // router.post("/refresh-token", httpService.create.bind(httpService));

  return router;
};
