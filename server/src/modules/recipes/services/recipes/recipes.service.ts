import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { CacheRedisService } from '@/modules/service/modules/app-cache/services/cache-redis/cache-redis.service'
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

@Injectable()
export class RecipesService implements IRecipesService {
    constructor(
        private readonly externalRecipesService: TastyRecipesService,
        private readonly searchRecipesService: TastySearchRecipesService,
        private readonly wishService: WishService,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
        private readonly cacheService: CacheRedisService,
    ) {}

    async getRecipeList(input: IGetRecipesInput): Promise<RecipeListDto> {
        const key = (Object.keys(input) as (keyof IGetRecipesInput)[])
            .filter((key) => input[key] !== undefined)
            .map((key) => `${key}:${input[key]}`)
            .join(';')
        const cachedRecipeList = await this.cacheService.get<RecipeListDto>(key)
        if (cachedRecipeList) {
            return cachedRecipeList
        }
        const recipeList =
            await this.externalRecipesService.getRecipeList(input)
        this.cacheService.save(key, recipeList, Infinity)
        recipeList.data.map((recipe) =>
            this.cacheService.save(recipe.recipeCredentials, recipe, Infinity),
        )
        return recipeList
    }

    async getRecipe(input: IGetRecipeInput): Promise<RecipeDto> {
        const key = input.recipeCredentials
        const cachedRecipe = await this.cacheService.get<RecipeDto>(key)
        if (cachedRecipe) {
            return cachedRecipe
        }
        const recipe = await this.externalRecipesService.getRecipe(
            input.recipeCredentials,
        )
        this.cacheService.save(key, recipe, Infinity)
        return recipe
    }

    async getSimilarRecipeList(
        input: IGetSimilarRecipeInput,
    ): Promise<RecipeListDto> {
        const key = `similarList${input.recipeCredentials}`
        const cachedRecipeList = await this.cacheService.get<RecipeListDto>(key)
        if (cachedRecipeList) {
            return cachedRecipeList
        }
        const recipeList =
            await this.externalRecipesService.getSimilarRecipeList(
                input.recipeCredentials,
            )
        this.cacheService.save(key, recipeList, Infinity)
        recipeList.data.map((recipe) =>
            this.cacheService.save(recipe.recipeCredentials, recipe, Infinity),
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
            data.map((recipe) =>
                this.cacheService.save(
                    recipe.recipeCredentials,
                    recipe,
                    Infinity,
                ),
            )
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
        const key = `searchRecipe${input.query}`
        const cachedHints = await this.cacheService.get<string[]>(key)
        if (cachedHints) {
            return cachedHints
        }
        const hints = await this.searchRecipesService.search(input.query)
        this.cacheService.save(key, hints)
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
