import { IErrorException, IValidationException } from '@/types'

export interface IRegisterUserDto {
    readonly email: string
    readonly password: string
}

export interface ILogInUserDto {
    readonly email: string
    readonly password: string
}

export interface IActivateUserDto {
    readonly activationLink: string
}

export interface IUserPayloadDto {
    readonly email: string
    readonly isActive: boolean
    readonly hasPassword: boolean
    readonly accessToken: string
    readonly refreshToken: string
}

export interface IServerErrorDto {
    readonly error: IErrorException | IValidationException
}

export interface ISetPasswordDto {
    readonly password: string
}

export interface IAuthService {
    registerUser(dto: IRegisterUserDto): Promise<IUserPayloadDto>
    logInUser(dto: ILogInUserDto): Promise<IUserPayloadDto>
    autoLogInUser(): Promise<IUserPayloadDto>
    logOutUser(): Promise<void>
    activateUser(dto: IActivateUserDto): Promise<string | null>
    sendConfirmEmail(): Promise<void>
    setPassword(dto: ISetPasswordDto): Promise<IUserPayloadDto>
}
