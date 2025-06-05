import { authToken } from "devchu-common";
import express, { Router } from "express";
import { UserMongooseRepository } from "./infras/repository";
import { modelName } from "./infras/repository/mongo/dto";
import { UserHttpService } from "./infras/transport/express";
import { UserUseCase } from "./useCase";

const app = express();


const repository = new UserMongooseRepository(modelName);
const useCase = new UserUseCase(repository);
const httpService = new UserHttpService(useCase);

const router = Router();

router.get("/user/profile", authToken, httpService.profile.bind(httpService));
router.get("/user", authToken, httpService.list.bind(httpService));

router.post("/user", authToken, httpService.create.bind(httpService));

router.patch("/user/:id", authToken, httpService.update.bind(httpService));

router.delete("/user/:id", authToken, httpService.delete.bind(httpService));

router.get("/user/health", (req, res) => {
    res.send("User Service is healthy");
});

app.use(router);

app.listen(3000, () => {
    console.log("User Service is listening on port 3000");
});
