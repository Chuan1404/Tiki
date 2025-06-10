import { MongooseRepository } from "devchu-common";
import { Category } from "../../../model";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../../model/dto";

export default class CategoryMongooseRepository extends MongooseRepository<
    Category,
    CategoryCondDTO,
    CategoryUpdateDTO
> {}
