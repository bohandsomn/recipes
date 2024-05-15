import { Global, Module } from '@nestjs/common'

import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n'
import * as path from 'path'

import { I18nLanguagesService } from './services/i18n-languages/i18n-languages.service'

@Global()
@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, 'constants', 'i18n'),
                watch: true,
            },
            resolvers: [AcceptLanguageResolver],
        }),
    ],
    providers: [I18nLanguagesService],
})
export class LanguagesModule {}
