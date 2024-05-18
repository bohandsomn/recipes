import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { getRequest } from '@/utils/get-request'

@Injectable()
export class PasswordGuard implements CanActivate {
    constructor(private readonly languagesService: I18nLanguagesService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = getRequest(context)
        const user = request.user
        if (!user) {
            const errorMessage = this.languagesService.exception(
                'auth.user.not-found',
            )
            throw new InternalServerErrorException(errorMessage)
        }
        if (!user.hasPassword) {
            const errorMessage = this.languagesService.exception(
                'auth.password.not-password',
            )
            throw new ForbiddenException(errorMessage)
        }
        return true
    }
}
