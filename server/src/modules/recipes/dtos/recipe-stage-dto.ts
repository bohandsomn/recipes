import { Field, ObjectType } from '@nestjs/graphql'

import { IRecipeStage } from '../interfaces/recipe-stage.interface'

@ObjectType()
export class RecipeStageDto implements IRecipeStage {
    @Field(() => Number)
    readonly id: number

    @Field(() => String, { nullable: true })
    readonly name: string | null

    @Field(() => Number, { nullable: true })
    readonly time: number | null
}
