import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'

import { I18nLanguagesService } from '@/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { UserTokenType } from '@/user/constants/user-token-type'
import { UserTokenService } from '@/user/services/user-token/user-token.service'
import { getRequest } from '@/utils/get-request'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userTokenService: UserTokenService,
        private readonly languagesService: I18nLanguagesService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = getRequest(context)
        const authHeader = request.headers.authorization
        if (!authHeader) {
            const errorMessage = this.languagesService.exception(
                'user-token.split.not-found-header',
            )
            throw new UnauthorizedException(errorMessage)
        }
        const token = this.userTokenService.split(authHeader)
        const user = this.userTokenService.verify({
            token,
            type: UserTokenType.ACCESS_TOKEN,
        })
        request.user = user
        return true
    }
}
