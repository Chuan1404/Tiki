import cors from "cors";
import { errorHandler } from "devchu-common";
import dotenv from "dotenv";
import express from "express";
import { initRouter } from "./config";

const app = express();

(async () => {
    // Init app
    if (process.env.NODE_ENV !== "production") {
        dotenv.config();
    }
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Router
    const router = await initRouter();
    app.use(router);

    // Middleware
    app.use(errorHandler as any);

    // Start
    app.listen(3000, () => {
        console.log("Auth Service is listening on port 3000");
    });
})();
