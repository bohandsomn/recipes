import { SortRecipes, sortRecipesValues } from '../constants'

export function checkSortRecipes(data: unknown): data is SortRecipes {
    return sortRecipesValues.includes(data as SortRecipes)
}
