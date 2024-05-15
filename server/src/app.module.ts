import { Module } from '@nestjs/common'

import { ServiceModule } from './modules/service/service.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [ServiceModule, UserModule],
})
export class AppModule {}
