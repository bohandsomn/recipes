import { Module } from '@nestjs/common'

import { AppConfigModule } from './modules/app-config/app-config.module'
import { LanguagesModule } from './modules/languages/languages.module'

@Module({
    imports: [AppConfigModule, LanguagesModule],
})
export class ServiceModule {}
