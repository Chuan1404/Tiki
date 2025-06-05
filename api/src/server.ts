import errorHandler from "@shared/middleware/errorHandler";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { setUpBrandModule } from "./modules/brand";
import { setUpCartModule } from "./modules/cart";
import { setUpCategoryModule } from "./modules/category";
import { setUpProductModule } from "./modules/product";
import { setUpRefreshTokenModule } from "./modules/refreshToken";

dotenv.config();

const server = process.env.DATABASE_SERVER;
const database = process.env.DATABASE;
mongoose
    .connect(`mongodb://${server}/${database}`)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error("Database connection error");
    });

(async () => {
    const app = express();
    const PORT = process.env.PORT ?? 3001;

    // middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", setUpCategoryModule());
    app.use("/", setUpProductModule());
    app.use("/", setUpCartModule());
    app.use("/", setUpBrandModule());
    app.use("/", setUpRefreshTokenModule());

    app.use(errorHandler as any);

    app.listen(PORT, () => {
        console.log(`Server run at port ${PORT}`);
    });
})();
