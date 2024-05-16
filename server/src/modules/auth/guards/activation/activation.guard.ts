import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'

import { I18nLanguagesService } from '@/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { getRequest } from '@/utils/get-request'

@Injectable()
export class ActivationGuard implements CanActivate {
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
        if (!user.isActive) {
            const errorMessage = this.languagesService.exception(
                'auth.activation.not-activated',
            )
            throw new ForbiddenException(errorMessage)
        }
        return true
    }
}
