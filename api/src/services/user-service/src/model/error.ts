import { DataExistedError, DataInvalidError, DataNotFoundError } from "devchu-common"

export const User_NotFoundError = new DataNotFoundError(`User is not found`) 
export const User_InvalidError = (message: string) => (new DataInvalidError(message))
export const User_ExistedError = (email: string) => (new DataExistedError(`User with email ${email} is already existed`))  