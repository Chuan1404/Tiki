import { Router } from "express";
import { ComparePassword, HashPassword } from "../../share/component/password";
import { UserRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/dto";
import { UserHttpService } from "./infras/transport/express";
import { UserUseCase } from "./useCase";
import { authToken } from "../../share/middleware/OAuth2";

export const setUpUserModule = () => {
  init();

  const hashPassword = new HashPassword();
  const comparePassword = new ComparePassword();

  const repository = new UserRepository(modelName);
  const useCase = new UserUseCase(repository, hashPassword, comparePassword);
  const httpService = new UserHttpService(useCase);

  const router = Router();

  router.get("/users/profile", authToken, httpService.profile.bind(httpService));
  router.get("/users", authToken, httpService.list.bind(httpService));

  router.post("/users/login", httpService.login.bind(httpService));
  router.post("/users/register", httpService.create.bind(httpService));
  router.post("/users", authToken, httpService.create.bind(httpService));

  router.patch("/users/:id", authToken, httpService.update.bind(httpService));

  router.delete("/users/:id", authToken, httpService.delete.bind(httpService));

  return router;
};
