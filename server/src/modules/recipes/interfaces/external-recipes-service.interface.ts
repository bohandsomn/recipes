import { IExternalRecipe } from './external-recipe.interface'
import { IGetRecipesInput } from './get-recipes-input.interface'
import { IRecipeList } from './recipe-list.interface'

export interface IExternalRecipesService {
    getRecipeList(input: IGetRecipesInput): Promise<IRecipeList>
    getRecipe(recipeCredentials: string): Promise<IExternalRecipe>
    getSimilarRecipeList(recipeCredentials: string): Promise<IRecipeList>
}
