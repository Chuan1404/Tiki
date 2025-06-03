import { DataExistedError, DataInvalidError, DataNotFoundError } from "@shared/errors/DataError"

export const ProductId_NotFoundError = (id: string) => (new DataNotFoundError(`Not found any product with id ${id}`)) 
export const Product_InvalidError = new DataInvalidError(`Product is invalid`)
export const ProductName_InvalidError = (name: string) => (new DataInvalidError(`${name} is invalid product name`))
export const ProductName_ExistedError = (name: string) => (new DataExistedError(`Product name '${name}' existed`))  