import { Router } from "express";
import { init, modelName } from "./infras/repository/mongo/dto";
import { BrandUseCase } from "./useCase";
import { BrandHttpService } from "./infras/transport/express";
import { BrandMongooseRepository } from "./infras/repository";

export const setUpBrandModule = () => {
  init();

  const repository = new BrandMongooseRepository(modelName);
  const useCase = new BrandUseCase(repository);
  const httpService = new BrandHttpService(useCase);

  const router = Router();

  router.get("/brands/:id", httpService.get.bind(httpService));
  router.get("/brands", httpService.list.bind(httpService));
  router.post("/brands", httpService.create.bind(httpService));
  router.patch("/brands/:id", httpService.update.bind(httpService));
  router.delete("/brands/:id", httpService.delete.bind(httpService));
 
  router.get("/rpc/brands", httpService.findMany.bind(httpService))
  return router;
};
