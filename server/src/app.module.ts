import { Module } from '@nestjs/common'

import { AuthModule } from './modules/auth/auth.module'
import { MailModule } from './modules/mail/mail.module'
import { ServiceModule } from './modules/service/service.module'
import { UserModule } from './modules/user/user.module'
import { AppExceptionFilter } from './filters/app-exception/app-exception.filter'

@Module({
    imports: [ServiceModule, UserModule, AuthModule, MailModule],
    providers: [AppExceptionFilter],
})
export class AppModule { }
