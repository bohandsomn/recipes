import { HttpService } from '@nestjs/axios'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { lastValueFrom } from 'rxjs'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { LoggerService } from '@/modules/service/modules/logger/services/logger/logger.service'

import { ISearchRecipesService } from '../../interfaces/search-recipes-service.interface'
import { ITastySearchList } from '../../interfaces/tasty-search-list.interface'

@Injectable()
export class TastySearchRecipesService implements ISearchRecipesService {
    constructor(
        private readonly httpService: HttpService,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
    ) {}

    async search(query: string): Promise<string[]> {
        try {
            const { data } = await lastValueFrom(
                this.httpService.get<ITastySearchList>(
                    'recipes/auto-complete',
                    {
                        params: {
                            prefix: query,
                        },
                    },
                ),
            )
            const hints = data.results.map(({ search_value: hint }) => hint)
            return hints
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'search-recipes.search.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }
}
