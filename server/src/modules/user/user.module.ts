import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'

import { UserModel } from './models/user.model'
import { UserTokenService } from './services/user-token/user-token.service'
import { UserService } from './services/user/user.service'

@Module({
    imports: [JwtModule.register({}), SequelizeModule.forFeature([UserModel])],
    providers: [UserService, UserTokenService],
    exports: [UserService, UserTokenService],
})
export class UserModule {}
