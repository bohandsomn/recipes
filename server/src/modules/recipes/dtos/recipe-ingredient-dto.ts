import { IRecipeIngredient } from '../interfaces/recipe-ingredient.interface'

export class RecipeIngredientDto implements IRecipeIngredient {
    readonly name: string | null
    readonly text: string | null
    readonly measurements: string[] | null
}
