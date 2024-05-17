import { HttpService } from '@nestjs/axios'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { lastValueFrom } from 'rxjs'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { LoggerService } from '@/modules/service/modules/logger/services/logger/logger.service'

import { DEFAULT_RECIPE_PAGE } from '../../constants/default-recipe-page'
import { DEFAULT_RECIPE_SIZE } from '../../constants/default-recipe-size'
import { ExternalRecipe } from '../../constants/external-recipe'
import { IExternalRecipesService } from '../../interfaces/external-recipes-service.interface'
import { IGetRecipesInput } from '../../interfaces/get-recipes-input.interface'
import { IRecipeList } from '../../interfaces/recipe-list.interface'
import { IRecipe } from '../../interfaces/recipe.interface'
import { ITastyRecipeList } from '../../interfaces/tasty-recipe-list.interface'
import { ITastyRecipe } from '../../interfaces/tasty-recipe.interface'

@Injectable()
export class TastyRecipesService implements IExternalRecipesService {
    constructor(
        private readonly httpService: HttpService,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
    ) { }

    async getRecipeList(input: IGetRecipesInput): Promise<IRecipeList> {
        try {
            const page = input.page ?? DEFAULT_RECIPE_PAGE
            const size = input.size ?? DEFAULT_RECIPE_SIZE
            const { data: recipeList } = await lastValueFrom(
                this.httpService.get<ITastyRecipeList>('recipes/list', {
                    params: {
                        from: page.toString(),
                        size: size.toString(),
                        q: input.query,
                        sort: input.sort,
                    },
                }),
            )
            const data = recipeList.results.map((recipe) =>
                this.mapRecipe(recipe),
            )
            const count = recipeList.count
            return {
                count,
                data,
            }
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'recipes.get-recipe-list.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    async getRecipe(recipeCredentials: string): Promise<IRecipe> {
        try {
            const id = recipeCredentials.split('_')[1]
            const { data: recipe } = await lastValueFrom(
                this.httpService.get<ITastyRecipe>('recipes/get-more-info', {
                    params: {
                        id,
                    },
                }),
            )
            const data = this.mapRecipe(recipe)
            return data
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'recipes.get-recipe.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    async getSimilarRecipeList(
        recipeCredentials: string,
    ): Promise<IRecipeList> {
        try {
            const id = recipeCredentials.split('_')[1]
            const { data: recipeList } = await lastValueFrom(
                this.httpService.get<ITastyRecipeList>(
                    'recipes/list-similarities',
                    {
                        params: {
                            recipe_id: id,
                        },
                    },
                ),
            )
            const data = recipeList.results.map((recipe) =>
                this.mapRecipe(recipe),
            )
            const count = recipeList.count
            return {
                count,
                data,
            }
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'recipes.get-similar-recipe-list.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    private mapRecipe({
        id,
        name,
        description,
        keywords,
        price,
        total_time_minutes: time,
        original_video_url: video,
        thumbnail_url: image,
        nutrition,
        user_ratings: ratings,
        topics,
        tags,
        instructions,
        sections,
    }: ITastyRecipe): IRecipe {
        return {
            recipeCredentials: `${ExternalRecipe.TASTY}_${id}`,
            name,
            description,
            keywords,
            price: price?.total ?? null,
            time,
            video,
            image,
            calories: nutrition?.calories ?? null,
            carbohydrate: nutrition?.carbohydrates ?? null,
            fat: nutrition?.fat ?? null,
            fiber: nutrition?.fiber ?? null,
            protein: nutrition?.protein ?? null,
            sugar: nutrition?.sugar ?? null,
            rating:
                !ratings?.count_positive || !ratings.count_negative
                    ? null
                    : ratings?.count_positive /
                    (ratings.count_positive + ratings.count_negative),
            topics: topics
                .map(({ name }) => name)
                .filter((name): name is string => !!name),
            tags: tags
                .map(({ display_name: name }) => name)
                .filter((name): name is string => !!name),
            stages: instructions.map(
                ({
                    id,
                    display_text: name,
                    start_time: start,
                    end_time: end,
                }) => ({
                    id,
                    name,
                    time: !end || !start ? null : end - start,
                }),
            ),
            ingredients: sections
                .map(({ components }) => components)
                .flat()
                .map(
                    ({
                        ingredient: { name },
                        raw_text: text,
                        measurements,
                    }) => ({
                        name,
                        text,
                        measurements: measurements.map(
                            ({ quantity, unit: { name } }) =>
                                [quantity, name].filter((value) => !!value).join(' ')
                        ),
                    }),
                ),
        }
    }
}
