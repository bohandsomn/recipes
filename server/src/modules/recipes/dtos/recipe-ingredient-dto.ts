import { Field, ObjectType } from '@nestjs/graphql'

import { IRecipeIngredient } from '../interfaces/recipe-ingredient.interface'

@ObjectType()
export class RecipeIngredientDto implements IRecipeIngredient {
    @Field(() => String, { nullable: true })
    readonly name: string | null

    @Field(() => String, { nullable: true })
    readonly text: string | null

    @Field(() => [String], { nullable: true })
    readonly measurements: string[] | null
}
