import { DataExistedError, DataInvalidError, DataNotFoundError } from "devchu-common";

export const Brand_InvalidError = new DataInvalidError(`Brand is invalid`);
export const BrandId_NotFoundError = (id: string) =>
    new DataNotFoundError(`Not found any brand with id ${id}`);
export const BrandName_InvalidError = (name: string) =>
    new DataInvalidError(`${name} is invalid brand name`);
export const BrandName_ExistedError = (name: string) =>
    new DataExistedError(`Brand name '${name}' existed`);
