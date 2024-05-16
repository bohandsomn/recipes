import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'

import { Response } from 'express'
import { Observable, map } from 'rxjs'

import { REFRESH_TOKEN_COOKIE } from '../../constants/refresh-token-cookie'

@Injectable()
export class ClearTokenInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<null> {
        const response: Response = context.switchToHttp().getResponse()
        return next.handle().pipe(
            map(() => {
                response.clearCookie(REFRESH_TOKEN_COOKIE)
                return null
            }),
        )
    }
}
