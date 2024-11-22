import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { CartRepository } from "./infras/repository";
import { CartUsecase } from "./usecase";
import { CartHttpService } from "./infras/transport/express";
import { authToken } from "../../share/middleware/OAuth2";
import { RPCProductRepository } from "./infras/rpc";
import { rpc } from "../../share/configs/rpc";

export const setUpCartModule = () => {
  init();

  const repository = new CartRepository(modelName);
  const usecase = new CartUsecase(repository);
  const rpcProduct = new RPCProductRepository(rpc.cartProduct);
  const httpService = new CartHttpService(usecase, rpcProduct);

  const router = Router();

  router.get("/carts/me", authToken, httpService.myCart.bind(httpService));
  router.get("/carts", authToken, httpService.list.bind(httpService));
  router.post(
    "/carts",
    authToken,
    httpService.create.bind(httpService)
  );
  router.patch("/carts/:id", authToken, httpService.update.bind(httpService));
  router.delete("/carts/:id", authToken, httpService.delete.bind(httpService));

  return router
};
