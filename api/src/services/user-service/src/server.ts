import cors from "cors";
import { authToken, errorHandler, RabbitMQ } from "devchu-common";
import dotenv from "dotenv";
import express, { Router } from "express";
import mongoose from "mongoose";
import { UserCreatedHandler, UserGetByEmailHandler } from "./infras/listener";
import { UserMongooseRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/mongo/dto";
import { UserHttpService } from "./infras/transport/express";
import { UserUseCase } from "./useCase";

dotenv.config();
const app = express();

(async () => {
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce");
    init();

    const messageBroker = new RabbitMQ(process.env.RABBITMQ_URL || "amqp://localhost");
    await messageBroker.connect();

    const repository = new UserMongooseRepository(mongoose.models[modelName]);
    const useCase = new UserUseCase(repository, messageBroker);
    const httpService = new UserHttpService(useCase);

    // listener
    // messageBroker.subscribe("user", "user.created", new UserCreatedHandler(useCase));
    // messageBroker.subscribe("user", "user.getByEmail", new UserGetByEmailHandler(useCase));

    const router = Router();

    router.get("/user/profile", authToken, httpService.profile.bind(httpService));
    router.get("/user/:id", authToken, httpService.getById.bind(httpService));
    router.get("/user", authToken, httpService.list.bind(httpService));

    router.post("/user", authToken, httpService.create.bind(httpService));

    router.patch("/user/:id", authToken, httpService.update.bind(httpService));

    router.delete("/user/:id", authToken, httpService.delete.bind(httpService));

    // rpc
    router.get("/rpc/user/getByCond", httpService.getByCond.bind(httpService));
    router.post("/rpc/user", httpService.create.bind(httpService));

    router.get("/user/health", (req, res) => {
        res.send("User Service is healthy");
    });

    app.use(router);

    app.use(errorHandler as any);

    app.listen(3001, () => {
        console.log("User Service is listening on port 3001");
    });
})();
