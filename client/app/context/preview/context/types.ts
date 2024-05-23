import { IRecipeListPreview } from '@/components/recipes'
import { IClientResponse, IServerResponse } from '@/types'
import { IWithSetter } from '@/utils'

export type IRecipesState = IServerResponse<IRecipeListPreview>

export type IRecipesContext = IWithSetter<IClientResponse<IRecipeListPreview>>
