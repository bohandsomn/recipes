export interface IUserModel {
    id: number
    email: string
    password: string | null
    isActive: boolean
    activationLink: string
}
