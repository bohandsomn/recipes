import { IRecipe } from '@/components/recipes/types'
import { IClientResponse, IServerResponse } from '@/types'
import { IWithSetter } from '@/utils'

export type IRecipeState = IServerResponse<IRecipe>

export type IRecipeContext = IWithSetter<IClientResponse<IRecipe>>
