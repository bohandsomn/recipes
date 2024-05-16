import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'

import { Response } from 'express'
import { Observable, map } from 'rxjs'

import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'

@Injectable()
export class ClientRedirectInterceptor implements NestInterceptor {
    constructor(private readonly appConfigService: AppConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response: Response = context.switchToHttp().getResponse()
        return next.handle().pipe(
            map(() => {
                const clientUrl = this.appConfigService.get(
                    Environment.CLIENT_URL,
                )
                return response.redirect(clientUrl)
            }),
        )
    }
}
