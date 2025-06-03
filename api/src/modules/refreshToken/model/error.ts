import { DataExistedError, DataInvalidError, DataNotFoundError } from "@shared/errors/DataError"

export const RefreshToken_NotFoundError = new DataNotFoundError(`Refresh token not found`)
export const RefreshToken_InvalidError = new DataInvalidError(`Refresh token invalid`)
export const RefreshToken_ExistedError = new DataExistedError(`Refresh token existed`)