import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UserModel } from './models/user.model'
import { UserService } from './services/user/user.service'

@Module({
    imports: [SequelizeModule.forFeature([UserModel])],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
