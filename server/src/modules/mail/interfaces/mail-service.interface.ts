import { IConfirmMailInput } from './confirm-mail-input.interface'

export interface IMailService {
    confirmMail(input: IConfirmMailInput): Promise<void>
}
