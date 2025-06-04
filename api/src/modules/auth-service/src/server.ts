import { ComparePassword, HashPassword } from "devchu-common/component/password";
import express, { Router } from "express";
import { AuthUseCase } from "./useCase";
import { AuthHttpService } from "./infras/transport/express";

const app = express();

const hashPassword = new HashPassword();
const comparePassword = new ComparePassword();

const useCase = new AuthUseCase(hashPassword, comparePassword);
const httpService = new AuthHttpService(useCase);

const router = Router();

router.post("/auth/login", httpService.login.bind(httpService));
router.post("/auth/register", httpService.register.bind(httpService));

app.listen(3001, () => {
    console.log("Auth Service is listening on port 3001");
});
