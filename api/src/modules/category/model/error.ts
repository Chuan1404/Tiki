import { DataExistedError, DataInvalidError, NotFoundError } from "../../../share/errors";

export const CategoryId_NotFoundError = (id: string) => (new NotFoundError(`Not found any category with id ${id}`)) 
export const CategoryName_InvalidError = (name: string) => (new DataInvalidError(`${name} is invalid category name`))
export const CategoryName_ExistedError = (name: string) => (new DataExistedError(`Category name '${name}' existed`))  