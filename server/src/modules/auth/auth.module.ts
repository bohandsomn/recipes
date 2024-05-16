import { Module, forwardRef } from '@nestjs/common'

import { MailModule } from '../mail/mail.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './controllers/auth/auth.controller'
import { ActivationService } from './services/activation/activation.service'
import { AuthService } from './services/auth/auth.service'
import { BcryptjsPasswordService } from './services/bcryptjs-password/bcryptjs-password.service'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    imports: [forwardRef(() => UserModule), MailModule],
    providers: [
        BcryptjsPasswordService,
        ActivationService,
        AuthService,
        GoogleStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
