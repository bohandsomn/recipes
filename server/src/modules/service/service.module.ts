import { Module } from '@nestjs/common'

import { AppConfigModule } from './modules/app-config/app-config.module'
import { DatabaseModule } from './modules/database/database.module'
import { LanguagesModule } from './modules/languages/languages.module'
import { LoggerModule } from './modules/logger/logger.module'

@Module({
    imports: [AppConfigModule, LanguagesModule, DatabaseModule, LoggerModule],
})
export class ServiceModule {}
