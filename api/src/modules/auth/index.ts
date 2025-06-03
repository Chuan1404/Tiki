import { Router } from "express";
import { AuthHttpService } from "./infras/transport/express";
import { AuthUseCase } from "./useCase";

export const setUpAuthModule = () => {
  const useCase = new AuthUseCase();
  const httpService = new AuthHttpService(useCase);

  const router = Router();

  router.post("/auth/login", httpService.login.bind(httpService));
  router.post("/auth/register", httpService.register.bind(httpService));

  return router;
};
