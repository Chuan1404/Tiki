import cors from "cors";
import { authToken, RabbitMQ } from "devchu-common";
import dotenv from "dotenv";
import express, { Router } from "express";
import { AuthRegisteredHandler } from "./infras/messageListener/auth";
import { UserMongooseRepository } from "./infras/repository";
import { modelName } from "./infras/repository/mongo/dto";
import { UserHttpService } from "./infras/transport/express";
import { UserUseCase } from "./useCase";

dotenv.config();
const app = express();

(async () => {
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const messageBroker = new RabbitMQ(process.env.RABBITMQ_URL || "amqp://localhost");
    await messageBroker.connect();

    const repository = new UserMongooseRepository(
        process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce",
        modelName
    );
    const useCase = new UserUseCase(repository, messageBroker);
    const httpService = new UserHttpService(useCase);

    // listener
    messageBroker.subscribe("auth", "auth.registed", new AuthRegisteredHandler(useCase));

    const router = Router();

    router.get("/user/profile", authToken, httpService.profile.bind(httpService));
    router.get("/user", authToken, httpService.list.bind(httpService));

    router.post("/user", authToken, httpService.create.bind(httpService));

    router.patch("/user/:id", authToken, httpService.update.bind(httpService));

    router.delete("/user/:id", authToken, httpService.delete.bind(httpService));

    router.get("/user/health", (req, res) => {
        res.send("User Service is healthy");
    });

    app.use(router);

    app.listen(3001, () => {
        console.log("User Service is listening on port 3001");
    });
})();
