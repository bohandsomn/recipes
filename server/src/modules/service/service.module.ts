import { Module } from '@nestjs/common'

import { AppConfigModule } from './modules/app-config/app-config.module'

@Module({
    imports: [AppConfigModule],
})
export class ServiceModule {}
