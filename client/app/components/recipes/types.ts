import { SortRecipes } from './constants'

export interface IGetRecipePreviewInput {
    readonly page: number
    readonly size: number
    readonly query: string
    readonly sort: SortRecipes
}

export interface IRecipePreview {
    readonly recipeCredentials: string
    readonly name: string | null
    readonly description: string | null
    readonly keywords: string | null
    readonly time: number | null
    readonly image: string | null
    readonly rating: number | null
}

export interface IRecipeListPreview {
    readonly count: number
    readonly data: IRecipePreview[]
}

export interface IIngredient {
    readonly name: string | null
    readonly text: string | null
    readonly measurements: string[] | null
}

export interface IStage {
    readonly id: number | null
    readonly name: string | null
    readonly time: string | null
}

export interface IRecipe {
    readonly recipeCredentials: string
    readonly name: string | null
    readonly description: string | null
    readonly keywords: string | null
    readonly time: number | null
    readonly image: string | null
    readonly price: number | null
    readonly video: string | null
    readonly calories: number | null
    readonly carbohydrate: number | null
    readonly fat: number | null
    readonly fiber: number | null
    readonly protein: number | null
    readonly sugar: number | null
    readonly rating: number | null
    readonly topics: string[] | null
    readonly tags: string[] | null
    readonly ingredients: IIngredient[] | null
    readonly stages: IStage[] | null
}

export interface IToggleRecipeInput {
    readonly recipeCredentials: string
}
