import { DataExistedError, DataInvalidError, NotFoundError } from "../../../share/errors";

export const User_NotFoundError = new NotFoundError(`User is not found`) 
export const User_InvalidError = new DataInvalidError(`User is invalid`)
export const User_ExistedError = new DataExistedError(`User existed`)  