import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { UserRepository } from "./infras/repository";
import { UserUsecase } from "./usecase";
import { UserHttpService } from "./infras/transport/express";
import { ComparePassword, HashPassword } from "../../share/component/password";

export const setUpUserModule = () => {
  init();

  const hashPassword = new HashPassword();
  const comparePassword = new ComparePassword();

  const repository = new UserRepository(modelName);
  const usecase = new UserUsecase(repository, hashPassword, comparePassword);
  const httpService = new UserHttpService(usecase);

  const router = Router();

  router.get("/users/profile", httpService.profile.bind(httpService));
  router.get("/users", httpService.list.bind(httpService));

  router.post("/users/login", httpService.login.bind(httpService));
  router.post("/users/register", httpService.create.bind(httpService));
  router.post("/users", httpService.create.bind(httpService));

  router.patch("/users/:id", httpService.update.bind(httpService));

  router.delete("/users/:id", httpService.delete.bind(httpService));

  return router;
};
