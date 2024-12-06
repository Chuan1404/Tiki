import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { ProductRepository } from "./infras/repository";
import { ProductUseCase } from "./useCase";
import { ProductHttpService } from "./infras/transport/express";
import upload from "../../share/configs/multer";
import { RPCBrandRepository, RPCCategoryRepository } from "./infras/rpc";
import { rpc } from "../../share/configs/rpc";

export const setUpProductModule = () => {
  init();

  const repository = new ProductRepository(modelName);
  const rpcCategory = new RPCCategoryRepository(rpc.productCategory);
  const rpcBrand = new RPCBrandRepository(rpc.productBrand);
  const useCase = new ProductUseCase(repository);
  const httpService = new ProductHttpService(useCase, rpcCategory, rpcBrand);

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

  // internal call
  router.get("/rpc/products", httpService.findMany.bind(httpService));
  return router;
};
