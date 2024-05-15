import { IUserTokenPayload } from './user-token-payload.interface'
import { IUserTokens } from './user-tokens.interface'
import { IVerifyToken } from './verify-token.interface'

export interface IUserTokenService {
    generate(input: IUserTokenPayload): IUserTokens
    /**
     * Authorization header
     * @example "Bearer access-token"
     * @param header Authorization header from the `request.headers.authorization`
     * @returns {string} Access token
     */
    split(header: string): string
    verify(input: IVerifyToken): IUserTokenPayload
}
