import { Module, forwardRef } from '@nestjs/common'

import { UserModule } from '../user/user.module'
import { ActivationService } from './services/activation/activation.service'
import { BcryptjsPasswordService } from './services/bcryptjs-password/bcryptjs-password.service'

@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [BcryptjsPasswordService, ActivationService],
})
export class AuthModule {}
