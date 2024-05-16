export interface IUserPayload {
    readonly email: string
    readonly isActive: boolean
    readonly hasPassword: boolean
    readonly accessToken: string
    readonly refreshToken: string
}
