import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Environment } from '../service/modules/app-config/constants/environment'
import { AppConfigService } from '../service/modules/app-config/services/app-config/app-config.service'
import { UserModule } from '../user/user.module'
import { WishModel } from './models/wish.model'
import { RecipesResolver } from './resolvers/recipes/recipes.resolver'
import { RecipesService } from './services/recipes/recipes.service'
import { TastyRecipesService } from './services/tasty-recipes/tasty-recipes.service'
import { TastySearchRecipesService } from './services/tasty-search-recipes/tasty-search-recipes.service'
import { WishService } from './services/wish/wish.service'

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
        SequelizeModule.forFeature([WishModel]),
        UserModule,
    ],
    providers: [
        TastyRecipesService,
        TastySearchRecipesService,
        RecipesService,
        WishService,
        RecipesResolver,
    ],
})
export class RecipesModule {}
