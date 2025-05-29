import { Router } from "express";
import { rpc } from "../../share/configs/rpc";
import { authToken } from "../../share/middleware/OAuth2";
import { CartMongooseRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/mongo/dto";
import { RPCProductRepository } from "./infras/rpc";
import { CartHttpService } from "./infras/transport/express";
import { CartUseCase } from "./useCase";

export const setUpCartModule = () => {
  init();

  const repository = new CartMongooseRepository(modelName);
  const useCase = new CartUseCase(repository);
  const rpcProduct = new RPCProductRepository(rpc.cartProduct);
  const httpService = new CartHttpService(useCase, rpcProduct);

  const router = Router();

  router.get("/carts/me", authToken, httpService.myCart.bind(httpService));
  router.get("/carts", authToken, httpService.list.bind(httpService));
  router.post("/carts", authToken, httpService.create.bind(httpService));
  router.patch("/carts/:id", authToken, httpService.update.bind(httpService));
  router.delete("/carts/:id", authToken, httpService.delete.bind(httpService));

  return router;
};
