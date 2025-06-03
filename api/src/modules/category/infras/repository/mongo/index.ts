import { MongooseRepository } from "@shared/repository/MongooseRepository";
import { Category } from "../../../model";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../../model/dto";

export default class CategoryMongooseRepository extends MongooseRepository<
    Category,
    CategoryCondDTO,
    CategoryUpdateDTO
> {}
