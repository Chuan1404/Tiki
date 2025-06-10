import cors from "cors";
import { errorHandler, RabbitMQ } from "devchu-common";
import dotenv from "dotenv";
import express, { Router } from "express";
import mongoose from "mongoose";
import { BrandMongooseRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/mongo/dto";
import { BrandHttpService } from "./infras/transport/express";
import { BrandUseCase } from "./useCase";

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

    const repository = new BrandMongooseRepository(mongoose.models[modelName]);
    const useCase = new BrandUseCase(repository);
    const httpService = new BrandHttpService(useCase);

    const router = Router();

    router.get("/brand", httpService.list.bind(httpService));
    router.get("/brand/:id", httpService.get.bind(httpService));
    router.post("/brand", httpService.create.bind(httpService));
    router.patch("/brand/:id", httpService.update.bind(httpService));
    router.delete("/brand/:id", httpService.delete.bind(httpService));

    router.get("/rpc/brand", httpService.findMany.bind(httpService));

    router.get("/brand/health", (req, res) => {
        res.send("Brand Service is healthy");
    });

    app.use(router);

    app.use(errorHandler as any);

    app.listen(3003, () => {
        console.log("Brand service is listening on port 3003");
    });
})();
