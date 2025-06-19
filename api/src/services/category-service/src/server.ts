import cors from "cors";
import { errorHandler, RabbitMQ } from "devchu-common";
import dotenv from "dotenv";
import express, { Router } from "express";
import mongoose from "mongoose";
import { CategoryMongooseRepository, modelName } from "./infras/repository";
import { init } from "./infras/repository/mongo/dto";
import { CategoryHttpService } from "./infras/transport/express";
import { CategoryUseCase } from "./useCase";

const app = express();

(async () => {
    if (process.env.NODE_ENV !== "production") {
        dotenv.config();
    }
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await mongoose.connect(process.env.MONGO_URL || "mongodb://mongodb:27017/ecommerce");
    init();

    const messageBroker = new RabbitMQ(process.env.RABBITMQ_URL || "amqp://devchu:123456@rabbitmq:5672");
    await messageBroker.connect();

    const repository = new CategoryMongooseRepository(mongoose.models[modelName]);
    const useCase = new CategoryUseCase(repository);
    const httpService = new CategoryHttpService(useCase);

    const router = Router();

    router.get("/category", httpService.list.bind(httpService));
    router.get("/category/:id", httpService.get.bind(httpService));
    router.post("/category", httpService.create.bind(httpService));
    router.patch("/category/:id", httpService.update.bind(httpService));
    router.delete("/category/:id", httpService.delete.bind(httpService));

    router.get("/rpc/category", httpService.findMany.bind(httpService));

    router.get("/category/health", (req, res) => {
        res.send("Category Service is healthy");
    });

    app.use(router);

    app.use(errorHandler as any);

    app.listen(3002, () => {
        console.log("Category Service is listening on port 3002");
    });
})();
