import { RecipeDto } from '../dtos/recipe-dto'
import { RecipeListDto } from '../dtos/recipe-list-dto'
import { IAddOneWishInput } from './add-one-wish-input.interface'
import { IGetRecipeInput } from './get-recipe-input.interface'
import { IGetRecipesInput } from './get-recipes-input.interface'
import { IGetSimilarRecipeInput } from './get-similar-recipe-input.interface'
import { IGetUserRecipeInput } from './get-user-recipe-input.interface'
import { IRemoveOneWishInput } from './remove-one-wish-input.interface'
import { ISearchRecipeInput } from './search-recipe-input.interface'

export interface IRecipesService {
    getRecipeList(input: IGetRecipesInput): Promise<RecipeListDto>
    getRecipe(input: IGetRecipeInput): Promise<RecipeDto>
    getSimilarRecipeList(input: IGetSimilarRecipeInput): Promise<RecipeListDto>
    getUserRecipeList(input: IGetUserRecipeInput): Promise<RecipeListDto>
    searchRecipe(input: ISearchRecipeInput): Promise<string[]>
    addRecipe(input: IAddOneWishInput): Promise<string>
    removeRecipe(input: IRemoveOneWishInput): Promise<string>
}
