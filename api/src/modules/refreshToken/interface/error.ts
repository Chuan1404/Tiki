import { DataExistedError, DataInvalidError, NotFoundError } from "../../../share/errors";

export const RefreshToken_NotFoundError = new NotFoundError(`Refresh token not found`)
export const RefreshToken_InvalidError = new DataInvalidError(`Refresh token invalid`)
export const RefreshToken_ExistedError = new DataExistedError(`Refresh token existed`)