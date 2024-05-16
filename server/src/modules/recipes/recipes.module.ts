import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { Environment } from '../service/modules/app-config/constants/environment'
import { AppConfigService } from '../service/modules/app-config/services/app-config/app-config.service'
import { TastyRecipesService } from './services/tasty-recipes/tasty-recipes.service'
import { TastySearchRecipesService } from './services/tasty-search-recipes/tasty-search-recipes.service'

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory(appConfigService: AppConfigService) {
                const tastyUrl = appConfigService.get(Environment.TASTY_URL)
                const tastyKey = appConfigService.get(Environment.TASTY_KEY)
                const tastyHost = appConfigService.get(Environment.TASTY_HOST)
                return {
                    baseURL: tastyUrl,
                    headers: {
                        'X-RapidAPI-Key': tastyKey,
                        'X-RapidAPI-Host': tastyHost,
                    },
                }
            },
            inject: [AppConfigService],
        }),
    ],
    providers: [TastyRecipesService, TastySearchRecipesService],
})
export class RecipesModule {}
