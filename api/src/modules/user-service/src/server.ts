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

router.get("/users/profile", authToken, httpService.profile.bind(httpService));
router.get("/users", authToken, httpService.list.bind(httpService));

router.post("/users", authToken, httpService.create.bind(httpService));

router.patch("/users/:id", authToken, httpService.update.bind(httpService));

router.delete("/users/:id", authToken, httpService.delete.bind(httpService));

app.listen(3000, () => {
    console.log("User Service is listening on port 3000");
});
