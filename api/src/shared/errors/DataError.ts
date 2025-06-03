import AppError from "./AppError";

export class DataExistedError extends AppError {
    constructor(message: string) {
        super(message, 409)
    }
}

export class DataInvalidError extends AppError {
    constructor(message: string) {
        super(message, 400)
    }
}

export class DataNotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404)
    }
}