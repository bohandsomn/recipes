import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { LoggerService } from '@/modules/service/modules/logger/services/logger/logger.service'

import { RecipeDto } from '../../dtos/recipe-dto'
import { RecipeListDto } from '../../dtos/recipe-list-dto'
import { IAddOneWishInput } from '../../interfaces/add-one-wish-input.interface'
import { IGetRecipeInput } from '../../interfaces/get-recipe-input.interface'
import { IGetRecipesInput } from '../../interfaces/get-recipes-input.interface'
import { IGetSimilarRecipeInput } from '../../interfaces/get-similar-recipe-input.interface'
import { IGetUserRecipeInput } from '../../interfaces/get-user-recipe-input.interface'
import { IRecipe } from '../../interfaces/recipe.interface'
import { IRecipesService } from '../../interfaces/recipes-service.interface'
import { IRemoveOneWishInput } from '../../interfaces/remove-one-wish-input.interface'
import { ISearchRecipeInput } from '../../interfaces/search-recipe-input.interface'
import { TastyRecipesService } from '../../services/tasty-recipes/tasty-recipes.service'
import { TastySearchRecipesService } from '../../services/tasty-search-recipes/tasty-search-recipes.service'
import { WishService } from '../wish/wish.service'

// TODO: Add cache service
@Injectable()
export class RecipesService implements IRecipesService {
    constructor(
        private readonly externalRecipesService: TastyRecipesService,
        private readonly searchRecipesService: TastySearchRecipesService,
        private readonly wishService: WishService,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
    ) {}

    async getRecipeList(input: IGetRecipesInput): Promise<RecipeListDto> {
        const recipeList =
            await this.externalRecipesService.getRecipeList(input)
        return recipeList
    }

    async getRecipe(input: IGetRecipeInput): Promise<RecipeDto> {
        const recipe = await this.externalRecipesService.getRecipe(
            input.recipeCredentials,
        )
        return recipe
    }

    async getSimilarRecipeList(
        input: IGetSimilarRecipeInput,
    ): Promise<RecipeListDto> {
        const recipeList =
            await this.externalRecipesService.getSimilarRecipeList(
                input.recipeCredentials,
            )
        return recipeList
    }

    async getUserRecipeList(
        input: IGetUserRecipeInput,
    ): Promise<RecipeListDto> {
        try {
            const wishes = await this.wishService.findMany(input)
            const recipes = await Promise.all(
                wishes.map(
                    async ({ recipeCredentials }): Promise<IRecipe | null> => {
                        try {
                            const recipe =
                                await this.externalRecipesService.getRecipe(
                                    recipeCredentials,
                                )
                            return recipe
                        } catch (error) {
                            this.loggerService.error(error)
                            return null
                        }
                    },
                ),
            )
            const data = recipes.filter((recipe): recipe is IRecipe => !!recipe)
            return {
                count: data.length,
                data,
            }
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'recipes.get-user-recipe-list.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    async searchRecipe(input: ISearchRecipeInput): Promise<string[]> {
        const hints = await this.searchRecipesService.search(input.query)
        return hints
    }

    async addRecipe(input: IAddOneWishInput): Promise<string> {
        const recipeCredentials = await this.wishService.addOne(input)
        return recipeCredentials
    }

    async removeRecipe(input: IRemoveOneWishInput): Promise<string> {
        const recipeCredentials = await this.wishService.removeOne(input)
        return recipeCredentials
    }
}
