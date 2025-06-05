import cors from "cors";
import { errorHandler, RabbitMQ } from "devchu-common";
import dotenv from "dotenv";
import express, { Router } from "express";
import { ComparePassword, HashPassword } from "./common";
import { AuthHttpService } from "./infras/transport/express";
import { AuthUseCase } from "./useCase";

dotenv.config();

const app = express();

(async () => {
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const hashPassword = new HashPassword();
    const comparePassword = new ComparePassword();
    const messageBroker = new RabbitMQ(process.env.RABBITMQ_URL || "amqp://localhost");
    await messageBroker.connect();

    const useCase = new AuthUseCase(hashPassword, comparePassword, messageBroker);
    const httpService = new AuthHttpService(useCase);

    // router
    const router = Router();
    router.post("/auth/login", httpService.login.bind(httpService));
    router.post("/auth/register", httpService.register.bind(httpService));
    router.get("/auth/health", (req, res) => {
        res.json({ message: "Auth Service is healthy" });
    });

    app.use(router);

    // error handling middleware
    app.use(errorHandler as any);

    app.listen(3000, () => {
        console.log("Auth Service is listening on port 3000");
    });
})();
