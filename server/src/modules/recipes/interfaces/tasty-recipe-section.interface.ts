import { ITastyRecipeComponent } from './tasty-recipe-component.interface'

export interface ITastyRecipeSection {
    readonly components: ITastyRecipeComponent[]
    readonly name: string | null
    readonly position: number | null
}
