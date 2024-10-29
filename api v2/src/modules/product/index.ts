import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { ProductRepository } from "./infras/repository";
import { ProductUsecase } from "./usecase";
import { ProductHttpService } from "./infras/transport/express";
import upload from "../../share/configs/multer";
import { RPCCategoryRepository } from "./infras/rpc";
import { rpc } from "../../share/configs/rpc";

export const setUpProductModule = () => {
  init();

  const repository = new ProductRepository(modelName);
  const rpcCategory = new RPCCategoryRepository(rpc.productCategory);
  const usecase = new ProductUsecase(repository);
  const httpService = new ProductHttpService(usecase, rpcCategory);

  const router = Router();

  router.get("/products", httpService.list.bind(httpService));
  router.get("/products/:id", httpService.get.bind(httpService));
  router.post(
    "/products",
    upload.single("thumbnailUrl"),
    httpService.create.bind(httpService)
  );
  router.patch("/products/:id", httpService.update.bind(httpService));
  router.delete("/products/:id", httpService.delete.bind(httpService));

  return router;
};
