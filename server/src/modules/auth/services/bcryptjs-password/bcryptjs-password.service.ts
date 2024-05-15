import { Injectable } from '@nestjs/common'

import * as bcryptjs from 'bcryptjs'

import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'

import { IPasswordService } from '../../interfaces/password-service.interface'

@Injectable()
export class BcryptjsPasswordService implements IPasswordService {
    constructor(private readonly appConfigService: AppConfigService) {}

    async hash(password: string): Promise<string> {
        const salt = parseInt(
            this.appConfigService.get(Environment.PASSWORD_SALT),
        )
        const hashedPassword = await bcryptjs.hash(password, salt)
        return hashedPassword
    }

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcryptjs.compare(password, hashedPassword)
    }
}
