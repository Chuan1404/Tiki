import grpc, { Server, ServerCredentials } from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import cors from "cors";
import { RabbitMQ, rpc } from "devchu-common";
import express, { Express, Router } from "express";
import mongoose from "mongoose";
import { v7 } from "uuid";
import { ComparePassword, HashPassword } from "../common";
import TokenMongooseRepository from "../infras/repository/mongo";
import { init, modelName } from "../infras/repository/mongo/dto";
import { AuthHttpService } from "../infras/transport/express";
import { AuthUseCase } from "../useCase";
import { RPCUserRepository } from "../infras/rpc";

export function initApp(app: Express): void {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

export async function initRouter(): Promise<Router> {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce");
    init();

    const tokenRepository = new TokenMongooseRepository(mongoose.models[modelName]);
    const hashPassword = new HashPassword();
    const comparePassword = new ComparePassword();
    // const messageBroker = new RabbitMQ(process.env.RABBITMQ_URL || "amqp://localhost");
    // await messageBroker.connect();
    const rpcUserRepository = new RPCUserRepository(rpc.userURL);

    const useCase = new AuthUseCase(tokenRepository, hashPassword, comparePassword, rpcUserRepository);
    const httpService = new AuthHttpService(useCase);

    const router = Router();
    router.post("/auth/login", httpService.login.bind(httpService));
    router.post("/auth/register", httpService.register.bind(httpService));
    router.post("/auth/refreshtoken", httpService.refreshToken.bind(httpService));
    router.get("/auth/health", (req, res) => {
        res.json({ message: "Auth Service is healthy" });
    });

    return router;
}
