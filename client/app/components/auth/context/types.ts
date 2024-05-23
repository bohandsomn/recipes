import { IUserPayloadDto } from '@/services'
import { IClientResponse, IServerResponse } from '@/types'
import { IWithSetter } from '@/utils'

export type IAuthState = IServerResponse<IUserPayloadDto>

export type IAuthContext = IWithSetter<IClientResponse<IUserPayloadDto>>
