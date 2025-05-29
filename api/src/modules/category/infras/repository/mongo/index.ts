import { MongooseRepository } from "../../../../../share/repository/MongooseRepository";
import { Category } from "../../../model";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../../model/dto";

export default class CategoryMongoRepository extends MongooseRepository<
    Category,
    CategoryCondDTO,
    CategoryUpdateDTO
> {}
