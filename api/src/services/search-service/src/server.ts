import cors from "cors";
import { Elasticsearch, RabbitMQ } from "devchu-common";
import express, { Router } from "express";
import { ProductCreatedListener } from "./infras/listener";

const app = express();

(async () => {
    // middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const messageBroker = new RabbitMQ(
        process.env.RABBITMQ_URL || "amqp://devchu:123456@localhost:5672"
    );
    await messageBroker.connect();

    const elasticSearch = new Elasticsearch(
        process.env.ELASTICSEARCH_URL || "http://localhost:9200"
    );
    await elasticSearch.connect();

    const productCreatedHandler = new ProductCreatedListener(elasticSearch);
    messageBroker.subscribe("product", "product.created", productCreatedHandler);

    const router = Router();

    app.use(router);

    // app.use(errorHandler as any);

    app.listen(3007, () => {
        console.log("Search Service is listening on port 3007");
    });
})();
