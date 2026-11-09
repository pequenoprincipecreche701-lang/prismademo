export class AppError extends Error {
    public readonly statusCode: number

    constructor (message: string, statusCode = 400) {
        super(message)
        this.statusCode = statusCode;
        this.name = this.constructor.name
    }
}

export class NotFoundError extends AppError {
    constructor (message = "Recurso não encontrado"){
        super (message, 404)
    }
}

export class ConflictError extends AppError {
    constructor (message = "Registro já existe") {
        super(message, 409)
    }
}