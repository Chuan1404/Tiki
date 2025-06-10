import cors from "cors";
import { authToken, errorHandler, RabbitMQ, rpc } from "devchu-common";
import dotenv from "dotenv";
import express, { Router } from "express";
import mongoose from "mongoose";
import { CartMongooseRepository } from "./infras/repository";
import { init, modelName } from "./infras/repository/mongo/dto";
import { RPCProductRepository } from "./infras/rpc";
import { CartHttpService } from "./infras/transport/express";
import { CartUseCase } from "./useCase";

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

    const repository = new CartMongooseRepository(mongoose.models[modelName]);
    const useCase = new CartUseCase(repository);
    const rpcProduct = new RPCProductRepository(rpc.cartProduct);
    const httpService = new CartHttpService(useCase, rpcProduct);

    const router = Router();

    router.get("/cart/me", authToken, httpService.myCart.bind(httpService));
    router.get("/cart", authToken, httpService.list.bind(httpService));
    router.post("/cart", authToken, httpService.create.bind(httpService));
    router.patch("/cart/:id", authToken, httpService.update.bind(httpService));
    router.delete("/cart/:id", authToken, httpService.delete.bind(httpService));

    router.get("/cart/health", (req, res) => {
        res.send("Cart Service is healthy");
    });

    app.use(router);

    app.use(errorHandler as any);

    app.listen(3005, () => {
        console.log("Cart Service is listening on port 3005");
    });
})();
