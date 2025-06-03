import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import { setUpCategoryModule } from "./modules/category";
import { setUpProductModule } from "./modules/product";
import { setUpUserModule } from "./modules/user";
import { setUpCartModule } from "./modules/cart";
import { setUpBrandModule } from "./modules/brand";
import { setUpRefreshTokenModule } from "./modules/refreshToken";
import mongoose from "mongoose";
import { setUpAuthModule } from "modules/auth";
import errorHandler from "@shared/middleware/errorHandler";

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
  console.log("Connection has been established successfully");

  const app = express();
  const PORT = process.env.PORT ?? 3001;

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", setUpAuthModule());
  app.use("/", setUpCategoryModule());
  app.use("/", setUpProductModule());
  app.use("/", setUpUserModule());
  app.use("/", setUpCartModule());
  app.use("/", setUpBrandModule());
  app.use("/", setUpRefreshTokenModule());

  app.use(errorHandler as any)

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
})();
