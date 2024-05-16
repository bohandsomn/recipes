import { IExternalRecipe } from './external-recipe.interface'

export interface IRecipeList {
    readonly count: number
    readonly data: IExternalRecipe[]
}
