import { Module } from '@nestjs/common'

import { AuthModule } from './modules/auth/auth.module'
import { ServiceModule } from './modules/service/service.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [ServiceModule, UserModule, AuthModule],
})
export class AppModule {}
