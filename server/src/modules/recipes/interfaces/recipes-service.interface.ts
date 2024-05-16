import { RecipeDto } from '../dtos/recipe-dto'
import { RecipeListDto } from '../dtos/recipe-list-dto'
import { IAddOneWish } from './add-one-wish.interface'
import { IGetRecipeInput } from './get-recipe-input.interface'
import { IGetRecipesInput } from './get-recipes-input.interface'
import { IGetSimilarRecipeInput } from './get-similar-recipe-input.interface'
import { IRemoveOneWish } from './remove-one-wish.interface'
import { ISearchRecipeInput } from './search-recipe-input.interface'

export interface IRecipesService {
    getRecipeList(input: IGetRecipesInput): Promise<RecipeListDto>
    getRecipe(input: IGetRecipeInput): Promise<RecipeDto>
    getSimilarRecipeList(input: IGetSimilarRecipeInput): Promise<RecipeListDto>
    searchRecipe(input: ISearchRecipeInput): Promise<string[]>
    addRecipe(input: IAddOneWish): Promise<string>
    removeRecipe(input: IRemoveOneWish): Promise<string>
}
