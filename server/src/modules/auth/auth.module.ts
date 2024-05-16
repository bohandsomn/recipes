import { Module, forwardRef } from '@nestjs/common'

import { MailModule } from '../mail/mail.module'
import { UserModule } from '../user/user.module'
import { ActivationService } from './services/activation/activation.service'
import { AuthService } from './services/auth/auth.service'
import { BcryptjsPasswordService } from './services/bcryptjs-password/bcryptjs-password.service'

@Module({
    imports: [forwardRef(() => UserModule), MailModule],
    providers: [BcryptjsPasswordService, ActivationService, AuthService],
})
export class AuthModule {}
