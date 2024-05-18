import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { I18nContext, I18nService } from 'nestjs-i18n'

import { LoggerService } from '../../../logger/services/logger/logger.service'
import { ILanguagesServiceOptions } from '../../interfaces/languages-service-options.interface'
import { ILanguagesService } from '../../interfaces/languages-service.interface'

@Injectable()
export class I18nLanguagesService implements ILanguagesService {
    constructor(
        private readonly i18nService: I18nService,
        private readonly loggerService: LoggerService,
    ) {}

    exception(key: string, options?: ILanguagesServiceOptions): string {
        const fullPath = `exception.${key}`
        const translation = this.translate(fullPath, options)
        return translation
    }

    constant(key: string, options?: ILanguagesServiceOptions): string {
        const fullPath = `constant.${key}`
        const translation = this.translate(fullPath, options)
        return translation
    }

    getLanguage(): string {
        const current = I18nContext.current()
        const language = current?.lang
        if (!language) {
            throw new InternalServerErrorException(
                `Language '${language}' not found`,
            )
        }
        return language
    }

    private translate(
        path: string,
        options?: ILanguagesServiceOptions,
    ): string {
        try {
            const language = this.getLanguage()
            const translation = this.i18nService.translate(path, {
                args: options?.arguments,
                lang: language,
            })
            if (typeof translation !== 'string') {
                throw new InternalServerErrorException(
                    `Translation by path: "${path}" is not a string`,
                )
            }
            return translation
        } catch (error) {
            this.loggerService.error(error)
            throw new InternalServerErrorException(error)
        }
    }
}
