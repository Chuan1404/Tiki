export const ErrDataNotFound = new Error("Data not found");
export const ErrDataInvalid = new Error("Data invalid");
export const ErrDataExisted = new Error("Data existed");

// auth
export const ErrLoginFail = new Error("Email or password is not correct");
export const ErrUnAuthentication = new Error("Unauthentication");
export const ErrUnAuthorization = new Error("Unauthorization");

// user
export const ErrUnVertifyAccount = new Error("Account is unverified.");
export const ErrAccountBanned = new Error("Account is banned.");