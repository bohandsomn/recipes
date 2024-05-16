import { Field, ObjectType } from '@nestjs/graphql'

import { IRecipe } from '../interfaces/recipe.interface'
import { RecipeIngredientDto } from './recipe-ingredient-dto'
import { RecipeStageDto } from './recipe-stage-dto'

@ObjectType()
export class RecipeDto implements IRecipe {
    @Field(() => String)
    readonly recipeCredentials: string

    @Field(() => String, { nullable: true })
    readonly name: string | null

    @Field(() => String, { nullable: true })
    readonly description: string | null

    @Field(() => String, { nullable: true })
    readonly keywords: string | null

    @Field(() => Number, { nullable: true })
    readonly price: number | null

    @Field(() => Number, { nullable: true })
    readonly time: number | null

    @Field(() => String, { nullable: true })
    readonly video: string | null

    @Field(() => String, { nullable: true })
    readonly image: string | null

    @Field(() => Number, { nullable: true })
    readonly calories: number | null

    @Field(() => Number, { nullable: true })
    readonly carbohydrate: number | null

    @Field(() => Number, { nullable: true })
    readonly fat: number | null

    @Field(() => Number, { nullable: true })
    readonly fiber: number | null

    @Field(() => Number, { nullable: true })
    readonly protein: number | null

    @Field(() => Number, { nullable: true })
    readonly sugar: number | null

    @Field(() => Number, { nullable: true })
    readonly rating: number | null

    @Field(() => [String], { nullable: true })
    readonly topics: string[] | null

    @Field(() => [String], { nullable: true })
    readonly tags: string[] | null

    @Field(() => [RecipeStageDto], { nullable: true })
    readonly stages: RecipeStageDto[] | null

    @Field(() => [RecipeIngredientDto], { nullable: true })
    readonly ingredients: RecipeIngredientDto[] | null
}
