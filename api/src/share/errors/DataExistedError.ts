import AppError from "./AppError";

export default class DataExistedError extends AppError {
    constructor(message: string) {
        super(message, 409)
    }
}