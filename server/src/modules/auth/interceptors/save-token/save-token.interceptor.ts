import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'

import { Response } from 'express'
import { Observable, map } from 'rxjs'

import { Environment } from '@/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/service/modules/app-config/services/app-config/app-config.service'
import { UserPayloadDto } from '@/user/dtos/user-payload-dto'

import { REFRESH_TOKEN_COOKIE } from '../../constants/refresh-token-cookie'

@Injectable()
export class SaveTokenInterceptor implements NestInterceptor {
    constructor(private readonly appConfigService: AppConfigService) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<UserPayloadDto>,
    ): Observable<UserPayloadDto> {
        const response: Response = context.switchToHttp().getResponse()
        return next.handle().pipe(
            map((payload): UserPayloadDto => {
                const maxAge = parseInt(
                    this.appConfigService.get(Environment.COOKIE_TOKEN_MAX_AGE),
                )
                response.cookie(REFRESH_TOKEN_COOKIE, payload.refreshToken, {
                    maxAge,
                    httpOnly: true,
                })
                return payload
            }),
        )
    }
}
