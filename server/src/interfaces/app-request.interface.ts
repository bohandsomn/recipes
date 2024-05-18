import { Request } from 'express'

import { IUserTokenPayload } from '@/user/interfaces/user-token-payload.interface'

export interface IAppRequest extends Request {
    user?: IUserTokenPayload
}
