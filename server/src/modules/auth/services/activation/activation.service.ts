import { Inject, Injectable, forwardRef } from '@nestjs/common'

import * as uuid from 'uuid'

import { IUserModel } from '@/modules/user/interfaces/user-model.interface'
import { UserModel } from '@/modules/user/models/user.model'
import { UserService } from '@/modules/user/services/user/user.service'

import { IActivationPayload } from '../../interfaces/activation-payload.interface'
import { IActivationService } from '../../interfaces/activation-service.interface'

@Injectable()
export class ActivationService implements IActivationService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    initialActivate(): IActivationPayload {
        const activationLink = uuid.v4()
        const isActive = false
        return {
            isActive,
            activationLink,
        }
    }

    externalActivate(): IActivationPayload {
        const activationLink = uuid.v4()
        const isActive = true
        return {
            isActive,
            activationLink,
        }
    }

    async activate(activationLink: string): Promise<IUserModel> {
        const user = (await this.userService.getOne({
            activationLink,
        })) as UserModel
        user.isActive = true
        return user.save()
    }
}
