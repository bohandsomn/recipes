import { IRecipeListPreview } from '@/components/recipes/types'
import { IClientResponse, IServerResponse } from '@/types'
import { IWithSetter } from '@/utils'

export type IWishState = IServerResponse<IRecipeListPreview>

export type IWishContext = IWithSetter<IClientResponse<IRecipeListPreview>>
