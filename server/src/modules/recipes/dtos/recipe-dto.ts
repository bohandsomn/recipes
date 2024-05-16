import { IRecipe } from '../interfaces/recipe.interface'
import { RecipeIngredientDto } from './recipe-ingredient-dto'
import { RecipeStageDto } from './recipe-stage-dto'

export class RecipeDto implements IRecipe {
    readonly recipeCredentials: string
    readonly name: string | null
    readonly description: string | null
    readonly keywords: string | null
    readonly price: number | null
    readonly time: number | null
    readonly video: string | null
    readonly image: string | null
    readonly calories: number | null
    readonly carbohydrate: number | null
    readonly fat: number | null
    readonly fiber: number | null
    readonly protein: number | null
    readonly sugar: number | null
    readonly rating: number | null
    readonly topics: string[] | null
    readonly tags: string[] | null
    readonly stages: RecipeStageDto[] | null
    readonly ingredients: RecipeIngredientDto[] | null
}
