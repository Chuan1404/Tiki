import { config } from "dotenv";
import mongoose from "mongoose"

config();

const server = process.env.SERVER;
const database = process.env.DATABASE;

export function connect() {
  mongoose
    .connect(`mongodb://${server}/${database}`)
    .then(() => {
      console.log("Connect database success");
    })
    .catch(() => {
      console.log("Fail to connect database");
    });
}

