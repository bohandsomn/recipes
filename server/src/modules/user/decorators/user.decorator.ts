import {
    ExecutionContext,
    InternalServerErrorException,
    createParamDecorator,
} from '@nestjs/common'

import { getRequest } from '@/utils/get-request'

import { IUserTokenPayload } from '../interfaces/user-token-payload.interface'

export const User = createParamDecorator(
    (key: keyof IUserTokenPayload | void, context: ExecutionContext) => {
        const request = getRequest(context)
        const user = request.user
        if (!user) {
            throw new InternalServerErrorException(
                "The request does not have access to the user's payload",
            )
        }
        return key ? user[key] : user
    },
)
