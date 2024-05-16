import { Injectable } from '@nestjs/common'

import { RecipeDto } from '../../dtos/recipe-dto'
import { RecipeListDto } from '../../dtos/recipe-list-dto'
import { IAddOneWish } from '../../interfaces/add-one-wish.interface'
import { IGetRecipeInput } from '../../interfaces/get-recipe-input.interface'
import { IGetRecipesInput } from '../../interfaces/get-recipes-input.interface'
import { IGetSimilarRecipeInput } from '../../interfaces/get-similar-recipe-input.interface'
import { IRecipesService } from '../../interfaces/recipes-service.interface'
import { IRemoveOneWish } from '../../interfaces/remove-one-wish.interface'
import { ISearchRecipeInput } from '../../interfaces/search-recipe-input.interface'
import { TastyRecipesService } from '../../services/tasty-recipes/tasty-recipes.service'
import { TastySearchRecipesService } from '../../services/tasty-search-recipes/tasty-search-recipes.service'
import { WishService } from '../wish/wish.service'

// TODO: Add cache service and user's receipts
@Injectable()
export class RecipesService implements IRecipesService {
    constructor(
        private readonly externalRecipesService: TastyRecipesService,
        private readonly searchRecipesService: TastySearchRecipesService,
        private readonly wishService: WishService,
    ) { }

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

    async searchRecipe(input: ISearchRecipeInput): Promise<string[]> {
        const hints = await this.searchRecipesService.search(input.query)
        return hints
    }

    async addRecipe(input: IAddOneWish): Promise<string> {
        const recipeCredentials = await this.wishService.addOne(input)
        return recipeCredentials
    }

    async removeRecipe(input: IRemoveOneWish): Promise<string> {
        const recipeCredentials = await this.wishService.removeOne(input)
        return recipeCredentials
    }
}
