import { IsEmail, Length } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

import { MAX_PASSWORD } from '../constants/max-password'
import { MIN_PASSWORD } from '../constants/min-password'

export class LogInUserDto {
    @IsEmail(
        {},
        {
            message: i18nValidationMessage('auth.validation.email'),
        },
    )
    readonly email: string

    @Length(MIN_PASSWORD, MAX_PASSWORD, {
        message: i18nValidationMessage('auth.validation.password', {
            min: MIN_PASSWORD,
            max: MAX_PASSWORD,
        }),
    })
    readonly password: string
}
