import cors from "cors";
import dotenv from "dotenv";
import express, { Router } from "express";
import { ComparePassword, HashPassword } from "./common";
import { AuthHttpService } from "./infras/transport/express";
import { AuthUseCase } from "./useCase";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hashPassword = new HashPassword();
const comparePassword = new ComparePassword();

const useCase = new AuthUseCase(hashPassword, comparePassword);
const httpService = new AuthHttpService(useCase);

const router = Router();

router.post("/auth/login", httpService.login.bind(httpService));
router.post("/auth/register", httpService.register.bind(httpService));

router.get("/auth/health", (req, res) => {
    res.send("Auth Service is healthy");
});

app.use(router);

app.listen(3000, () => {
    console.log("Auth Service is listening on port 3000");
});
