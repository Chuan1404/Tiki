import { DataExistedError, DataInvalidError, DataNotFoundError } from "@shared/errors/DataError"

export const User_NotFoundError = new DataNotFoundError(`User is not found`) 
export const User_InvalidError = new DataInvalidError(`User is invalid`)
export const User_ExistedError = new DataExistedError(`User existed`)  