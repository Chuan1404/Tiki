import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { CategoryRepository } from "./infras/repository";
import { CategoryUsecase } from "./usecase";
import { CategoryHttpService } from "./infras/transport/express";

export const setUpCategoryModule = () => {
  init();

  const repository = new CategoryRepository(modelName);
  const usecase = new CategoryUsecase(repository);
  const httpService = new CategoryHttpService(usecase);

  const router = Router();

  router.get("/categories", httpService.list.bind(httpService));
  router.get("/categories/:id", httpService.get.bind(httpService));
  router.post("/categories", httpService.create.bind(httpService));
  router.patch("/categories/:id", httpService.update.bind(httpService));
  router.delete("/categories/:id", httpService.delete.bind(httpService));

  router.get("/rpc/categories", httpService.findMany.bind(httpService));

  return router
};
