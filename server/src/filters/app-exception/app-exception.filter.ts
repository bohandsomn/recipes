import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'

import { Response } from 'express'

import { LoggerService } from '@/service/modules/logger/services/logger/logger.service'

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}

    async catch(exception: HttpException, host: ArgumentsHost) {
        this.loggerService.error(exception)
        const response: Response = host.switchToHttp().getResponse()
        if (!response || typeof response.status !== 'function') {
            return exception
        }
        const status = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR
        const exceptionResponse = exception.getResponse()
        const message = exception?.message
        if (!exceptionResponse && !message) {
            return response.status(status).json(null)
        }
        return response.status(status).json({
            error: exceptionResponse ?? message,
        })
    }
}
