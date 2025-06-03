import AppError from "./AppError";

export class UnauthenticationError extends AppError {
    constructor(message: string) {
        super(message, 401)
    }
}

export default class UnauthorizationError extends AppError {
    constructor(message: string) {
        super(message, 403)
    }
}