export interface ICreateUserInput {
    readonly email: string
    readonly password?: string | null
    readonly isActive?: boolean
}
