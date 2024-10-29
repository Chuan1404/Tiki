import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { BrandRepository } from "./infras/repository";
import { BrandUsecase } from "./usecase";
import { BrandHttpService } from "./infras/transport/express";

export const setUpBrandModule = () => {
  init();

  const repository = new BrandRepository(modelName);
  const usecase = new BrandUsecase(repository);
  const httpService = new BrandHttpService(usecase);

  const router = Router();

  router.get("/brands", httpService.list.bind(httpService));
  router.get("/brands/:id", httpService.get.bind(httpService));
  router.post("/brands", httpService.create.bind(httpService));
  router.patch("/brands/:id", httpService.update.bind(httpService));
  router.delete("/brands/:id", httpService.delete.bind(httpService));

  return router;
};
