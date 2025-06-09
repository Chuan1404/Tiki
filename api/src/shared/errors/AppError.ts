export default class AppError extends Error {
    constructor(public readonly message: string, public readonly statusCode: number) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}