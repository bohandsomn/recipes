import { SortRecipes } from '../constants/sort-recipes'
import { RecipeDto } from '../dtos/recipe-dto'
import { RecipeListDto } from '../dtos/recipe-list-dto'

export interface IRecipesResolver {
    getRecipeList(
        page?: number,
        size?: number,
        query?: string,
        sort?: SortRecipes,
    ): Promise<RecipeListDto>
    getRecipe(recipeCredentials: string): Promise<RecipeDto>
    getSimilarRecipeList(recipeCredentials: string): Promise<RecipeListDto>
    getUserRecipeList(userId: number): Promise<RecipeListDto>
    searchRecipe(query: string): Promise<string[]>
    addRecipe(userId: number, recipeCredentials: string): Promise<string>
    removeRecipe(userId: number, recipeCredentials: string): Promise<string>
}
