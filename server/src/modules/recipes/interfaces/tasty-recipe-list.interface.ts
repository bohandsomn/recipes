import { ITastyRecipe } from './tasty-recipe.interface'

export interface ITastyRecipeList {
    readonly count: number
    readonly results: ITastyRecipe[]
}
