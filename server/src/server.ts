import dotenv from "dotenv";
import express from "express";
import { connect } from "./share/component/mongoose";
import { setUpCategoryModule } from "./modules/category";
import { setUpProductModule } from "./modules/product";

dotenv.config();

(async () => {
  connect();
  console.log("Connection has been established successfully");

  const app = express();
  const PORT = process.env.PORT || 3001;

  // middlewares
  app.use(express.json());

  app.use("/", setUpCategoryModule());
  app.use("/", setUpProductModule());

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
})();
