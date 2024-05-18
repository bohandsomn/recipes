import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'

import { MAX_PASSWORD } from '../../constants/max-password'
import { MIN_PASSWORD } from '../../constants/min-password'

@Injectable()
export class PasswordPipe implements PipeTransform {
    constructor(private readonly languagesService: I18nLanguagesService) {}

    transform(value: string) {
        const passportLength = value.length
        if (passportLength > MAX_PASSWORD || passportLength < MIN_PASSWORD) {
            const errorMessage = this.languagesService.exception(
                'auth.validation.password',
                {
                    arguments: {
                        min: MIN_PASSWORD,
                        max: MAX_PASSWORD,
                    },
                },
            )
            throw new BadRequestException(errorMessage)
        }
        return value
    }
}
