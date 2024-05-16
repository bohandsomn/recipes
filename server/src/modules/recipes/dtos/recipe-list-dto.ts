import { Field, ObjectType } from '@nestjs/graphql'

import { IRecipeList } from '../interfaces/recipe-list.interface'
import { RecipeDto } from './recipe-dto'

@ObjectType()
export class RecipeListDto implements IRecipeList {
    @Field(() => Number)
    readonly count: number

    @Field(() => [RecipeDto])
    readonly data: RecipeDto[]
}
