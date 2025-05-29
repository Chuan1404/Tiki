import { Router } from "express";
import { CategoryHttpService } from "./infras/transport/express";
import { CategoryUseCase } from "./useCase";
import { CategoryMongoRepository } from "./infras/repository";

export const setUpCategoryModule = () => {
  // init();

  const repository = new CategoryMongoRepository();
  const useCase = new CategoryUseCase(repository);
  const httpService = new CategoryHttpService(useCase);

  const router = Router();

  router.get("/categories", httpService.list.bind(httpService));
  router.get("/categories/:id", httpService.get.bind(httpService));
  router.post("/categories", httpService.create.bind(httpService));
  router.patch("/categories/:id", httpService.update.bind(httpService));
  router.delete("/categories/:id", httpService.delete.bind(httpService));

  router.get("/rpc/categories", httpService.findMany.bind(httpService));

  return router
};
