import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { CartRepository } from "./infras/repository";
import { CartUsecase } from "./usecase";
import { CartHttpService } from "./infras/transport/express";

export const setUpCartModule = () => {
  init();

  const repository = new CartRepository(modelName);
  const usecase = new CartUsecase(repository);
  const httpService = new CartHttpService(usecase);

  const router = Router();

  router.get("/carts", httpService.list.bind(httpService));
  router.post("/carts/:productId", httpService.update.bind(httpService));
  router.delete("/carts/:productId", httpService.delete.bind(httpService));

  return router
};
