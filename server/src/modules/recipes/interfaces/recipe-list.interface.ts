import { IRecipe } from './recipe.interface'

export interface IRecipeList {
    readonly count: number
    readonly data: IRecipe[]
}
