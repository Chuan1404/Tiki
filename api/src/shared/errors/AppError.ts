export default class AppError extends Error {
    constructor(public readonly message: string, public readonly statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}