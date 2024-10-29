import dotenv from "dotenv";
import express from "express";
import { connect } from "./share/component/mongoose";
import { setUpCategoryModule } from "./modules/category";
import { setUpProductModule } from "./modules/product";
import { setUpUserModule } from "./modules/user";
import { setUpCartModule } from "./modules/cart";

dotenv.config();

(async () => {
  connect();
  console.log("Connection has been established successfully");

  const app = express();
  const PORT = process.env.PORT ?? 3001;

  // middlewares
  // app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", setUpCategoryModule());
  app.use("/", setUpProductModule());
  app.use("/", setUpUserModule());
  app.use("/", setUpCartModule());

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
})();
