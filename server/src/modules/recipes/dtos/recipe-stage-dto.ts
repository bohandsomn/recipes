import { IRecipeStage } from '../interfaces/recipe-stage.interface'

export class RecipeStageDto implements IRecipeStage {
    readonly id: number
    readonly name: string | null
    readonly time: number | null
}
