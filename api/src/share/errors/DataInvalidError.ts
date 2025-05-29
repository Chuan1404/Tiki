import AppError from "./AppError";

export default class DataInvalidError extends AppError {
    constructor(message: string) {
        super(message, 400)
    }
}