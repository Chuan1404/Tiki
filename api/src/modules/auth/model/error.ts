import { UnauthenticationError } from "@shared/errors/OAuth2Error";

export const Auth_Error = new UnauthenticationError(`Login failed, please check your email and password`)
