export interface IErrorException {
    readonly error: string
    readonly message: string
    readonly statusCode: number
}

export interface IValidationException {
    readonly error: Record<string, string[]>
    readonly message: string
    readonly statusCode: number
}
