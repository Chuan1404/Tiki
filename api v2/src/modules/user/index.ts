import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { UserRepository } from "./infras/repository";
import { UserUsecase } from "./usecase";
import { UserHttpService } from "./infras/transport/express";
import { HashPassword } from "../../share/component/password";

export const setUpUserModule = () => {
  init();

  const hashPassword = new HashPassword()

  const repository = new UserRepository(modelName);
  const usecase = new UserUsecase(repository, hashPassword);
  const httpService = new UserHttpService(usecase);

  const router = Router();

  
  router.get("/users", httpService.list.bind(httpService));
  router.get("/users/:id", httpService.get.bind(httpService));

  router.post("/register", httpService.create.bind(httpService));
  router.post("/users", httpService.create.bind(httpService));

  router.patch("/users/:id", httpService.update.bind(httpService));

  router.delete("/users/:id", httpService.delete.bind(httpService));

  return router
};
