import { UserPayloadDto } from '@/modules/user/dtos/user-payload-dto'

import { ExternalUserDto } from '../dtos/external-user-dto'
import { LogInUserDto } from '../dtos/log-in-user-dto'
import { RegisterUserDto } from '../dtos/register-user-dto'

export interface IAuthController {
    registerUser(dto: RegisterUserDto): Promise<UserPayloadDto>
    logInUser(dto: LogInUserDto): Promise<UserPayloadDto>
    autoLogInUser(userId: number): Promise<UserPayloadDto>
    refreshToken(refreshToken: string): Promise<UserPayloadDto>
    logOutUser(refreshToken: string): Promise<void>
    activateUser(activationLink: string): Promise<void>
    sendConfirmEmail(userId: number): Promise<void>
    setUserPassword(userId: number, password: string): Promise<UserPayloadDto>
    google(): Promise<void>
    googleCallback(user: ExternalUserDto): Promise<UserPayloadDto>
}
