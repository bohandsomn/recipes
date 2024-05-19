import { IRecipeListPreview } from '@/components/recipes'
import { IClientResponse, IServerResponse } from '@/types'
import { IWithSetter } from '@/utils'

export type IHomeRecipesState = IServerResponse<IRecipeListPreview>

export type IHomeRecipesContext = IWithSetter<IClientResponse<IRecipeListPreview>>
