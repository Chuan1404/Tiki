import cors from "cors";
import { errorHandler, RabbitMQ } from "devchu-common";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { UserCreatedHandler } from "./infras/listener";
import { MailUseCase } from "./useCase";

const app = express();

(async () => {
    if (process.env.NODE_ENV !== "production") {
        dotenv.config();
    }
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const messageBroker = new RabbitMQ(process.env.RABBITMQ_URL || "amqp://devchu:123456@rabbitmq:5672");
    await messageBroker.connect();

    const useCase = new MailUseCase(transporter, messageBroker);
    const userCreatedHandler = new UserCreatedHandler(useCase);

    messageBroker.subscribe("user", "user.created", userCreatedHandler);

    app.use(errorHandler as any);

    app.listen(3006, () => {
        console.log("Mail Service is listening on port 3006");
    });
})();
