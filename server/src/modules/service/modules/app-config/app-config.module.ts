import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppConfigService } from './services/app-config/app-config.service'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:
                process.env.NODE_ENV === 'development'
                    ? '.env.development'
                    : '.env.production',
        }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}
