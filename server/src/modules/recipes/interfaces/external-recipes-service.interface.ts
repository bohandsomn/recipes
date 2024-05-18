import { IGetRecipesInput } from './get-recipes-input.interface'
import { IRecipeList } from './recipe-list.interface'
import { IRecipe } from './recipe.interface'

export interface IExternalRecipesService {
    getRecipeList(input: IGetRecipesInput): Promise<IRecipeList>
    getRecipe(recipeCredentials: string): Promise<IRecipe>
    getSimilarRecipeList(recipeCredentials: string): Promise<IRecipeList>
}
