import { UserPayloadDto } from '@/modules/user/dtos/user-payload-dto'

import { IActivateUserInput } from './activate-user-input.interface'
import { IAutoLogInUserInput } from './auto-log-in-user-input.interface'
import { IExternalLogInUserInput } from './external-log-in-user-input.interface'
import { ILogInUserInput } from './log-in-user-input.interface'
import { IRefreshTokenInput } from './refresh-token-input.interface'
import { IRegisterUserInput } from './register-user-input.interface'
import { ISendConfirmEmailInput } from './send-confirm-email-input.interface'
import { ISetUserPasswordInput } from './set-user-password-input.interface'

export interface IAuthService {
    registerUser(input: IRegisterUserInput): Promise<UserPayloadDto>
    logInUser(input: ILogInUserInput): Promise<UserPayloadDto>
    autoLogInUser(input: IAutoLogInUserInput): Promise<UserPayloadDto>
    externalLogInUser(input: IExternalLogInUserInput): Promise<UserPayloadDto>
    refreshToken(input: IRefreshTokenInput): Promise<UserPayloadDto>
    activateUser(input: IActivateUserInput): Promise<void>
    sendConfirmEmail(input: ISendConfirmEmailInput): Promise<void>
    setUserPassword(input: ISetUserPasswordInput): Promise<UserPayloadDto>
}
