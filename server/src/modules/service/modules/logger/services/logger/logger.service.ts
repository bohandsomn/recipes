import { ConsoleLogger, Injectable } from '@nestjs/common'

import { ILoggerService } from '../../interfaces/logger-service.interface'

@Injectable()
export class LoggerService implements ILoggerService {
    constructor(private readonly logger: ConsoleLogger) {}

    error(message: unknown): void {
        this.logger.error(message)
    }
}
