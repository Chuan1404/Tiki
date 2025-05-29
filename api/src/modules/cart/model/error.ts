import { DataExistedError, DataInvalidError, NotFoundError } from "../../../share/errors";

export const Cart_NotFoundError = new NotFoundError(`Cart not found`)
export const Cart_InvalidError = new DataInvalidError(`Cart data invalid`)
export const Cart_ExistedError = new DataExistedError(`Cart data existed`)