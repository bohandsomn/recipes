export interface ICreateUserInput {
    readonly email: string
    readonly activationLink: string
    readonly password?: string | null
    readonly isActive?: boolean
}
