import { SortRecipes } from '../constants/sort-recipes'

export interface IGetRecipesInput {
    readonly page?: number
    readonly size?: number
    readonly query?: string
    readonly sort?: SortRecipes
}
