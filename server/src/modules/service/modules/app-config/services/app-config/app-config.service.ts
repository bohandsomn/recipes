import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Environment } from '../../constants/environment'
import { IAppConfigService } from '../../interfaces/app-config-service.interface'

@Injectable()
export class AppConfigService implements IAppConfigService {
    constructor(private readonly configService: ConfigService) {}

    get(environment: Environment): string {
        return this.configService.getOrThrow(environment)
    }
}
