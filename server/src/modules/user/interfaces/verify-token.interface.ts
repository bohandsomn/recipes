import { UserTokenType } from '../constants/user-token-type'

export interface IVerifyToken {
    readonly token: string
    readonly type: UserTokenType
}
