import { DataExistedError, DataInvalidError, DataNotFoundError } from "devchu-common";

export const CategoryId_NotFoundError = (id: string) =>
    new DataNotFoundError(`Not found any category with id ${id}`);
export const CategoryName_InvalidError = (name: string) =>
    new DataInvalidError(`${name} is invalid category name`);
export const CategoryName_ExistedError = (name: string) =>
    new DataExistedError(`Category name '${name}' existed`);
