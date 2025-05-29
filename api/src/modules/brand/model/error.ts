import { DataExistedError, DataInvalidError, NotFoundError } from "../../../share/errors";

export const BrandId_NotFoundError = (id: string) => (new NotFoundError(`Not found any brand with id ${id}`)) 
export const BrandName_InvalidError = (name: string) => (new DataInvalidError(`${name} is invalid brand name`))
export const BrandName_ExistedError = (name: string) => (new DataExistedError(`Brand name '${name}' existed`))  