import { ConsoleLogger, Global, Module } from '@nestjs/common'

import { LoggerService } from './services/logger/logger.service'

@Global()
@Module({
    providers: [ConsoleLogger, LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
