import { IUserPayload } from '@/modules/user/interfaces/user-payload.interface'

import { IActivateUserInput } from './activate-user-input.interface'
import { IAutoLogInUserInput } from './auto-log-in-user-input.interface'
import { IExternalLogInUserInput } from './external-log-in-user-input.interface'
import { ILogInUserInput } from './log-in-user-input.interface'
import { IRefreshTokenInput } from './refresh-token-input.interface'
import { IRegisterUserInput } from './register-user-input.interface'
import { ISendConfirmEmailInput } from './send-confirm-email-input.interface'

export interface IAuthService {
    registerUser(input: IRegisterUserInput): Promise<IUserPayload>
    logInUser(input: ILogInUserInput): Promise<IUserPayload>
    autoLogInUser(input: IAutoLogInUserInput): Promise<IUserPayload>
    externalLogInUser(input: IExternalLogInUserInput): Promise<IUserPayload>
    refreshToken(input: IRefreshTokenInput): Promise<IUserPayload>
    activateUser(input: IActivateUserInput): Promise<void>
    sendConfirmEmail(input: ISendConfirmEmailInput): Promise<void>
}
