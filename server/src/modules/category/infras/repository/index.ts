import { MongooseRepository } from "../../../../share/repository/MongooseRepository";
import { Category } from "../../model";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";

export class CategoryRepository extends MongooseRepository<
  Category,
  CategoryCondDTO,
  CategoryUpdateDTO
> {}
