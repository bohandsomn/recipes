import { IRecipeList } from '../interfaces/recipe-list.interface'
import { RecipeDto } from './recipe-dto'

export class RecipeListDto implements IRecipeList {
    readonly count: number
    readonly data: RecipeDto[]
}
