import AppError from "./AppError";

export default class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404)
    }
}