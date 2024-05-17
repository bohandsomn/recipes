import { Module } from '@nestjs/common'

import { AppCacheModule } from './modules/app-cache/app-cache.module'
import { AppConfigModule } from './modules/app-config/app-config.module'
import { DatabaseModule } from './modules/database/database.module'
import { GraphqlModule } from './modules/graphql/graphql.module'
import { LanguagesModule } from './modules/languages/languages.module'
import { LoggerModule } from './modules/logger/logger.module'

@Module({
    imports: [
        AppConfigModule,
        LanguagesModule,
        DatabaseModule,
        LoggerModule,
        GraphqlModule,
        AppCacheModule,
    ],
})
export class ServiceModule {}
