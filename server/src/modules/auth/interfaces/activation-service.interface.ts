import { IUserModel } from '@/modules/user/interfaces/user-model.interface'

import { IActivationPayload } from './activation-payload.interface'

export interface IActivationService {
    initialActivate(): IActivationPayload
    externalActivate(): IActivationPayload
    activate(activationLink: string): Promise<IUserModel>
}
