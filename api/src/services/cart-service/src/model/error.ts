import { DataExistedError, DataInvalidError, DataNotFoundError } from "devchu-common"

export const Cart_NotFoundError = new DataNotFoundError(`Cart not found`);
export const Cart_InvalidError = new DataInvalidError(`Cart data invalid`);
export const Cart_ExistedError = new DataExistedError(`Cart data existed`);
