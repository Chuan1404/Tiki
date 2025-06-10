import { DataInvalidError, UnauthenticationError } from "devchu-common";

export const Auth_Error = new UnauthenticationError(`Login failed, please check your email and password`)
export const AuthRegister_InvalidError = (message: string) => new DataInvalidError(message);
export const AuthToken_InvalidError = new DataInvalidError("Token invalid or expired");