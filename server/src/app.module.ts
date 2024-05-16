import { Module } from '@nestjs/common'

import { AppExceptionFilter } from './filters/app-exception/app-exception.filter'
import { AuthModule } from './modules/auth/auth.module'
import { MailModule } from './modules/mail/mail.module'
import { RecipesModule } from './modules/recipes/recipes.module'
import { ServiceModule } from './modules/service/service.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [ServiceModule, UserModule, AuthModule, MailModule, RecipesModule],
    providers: [AppExceptionFilter],
})
export class AppModule {}
