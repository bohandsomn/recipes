import { Module } from '@nestjs/common'

import { BcryptjsPasswordService } from './services/bcryptjs-password/bcryptjs-password.service'

@Module({
    providers: [BcryptjsPasswordService],
})
export class AuthModule {}
