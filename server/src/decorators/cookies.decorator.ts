import {
    ExecutionContext,
    ForbiddenException,
    createParamDecorator,
} from '@nestjs/common'

import { Request } from 'express'

export const Cookies = createParamDecorator(
    (key: string | undefined, context: ExecutionContext) => {
        const request: Request = context.switchToHttp().getRequest()
        const cookies: Record<string, string> = request.cookies ?? {}
        if (!key) {
            return cookies
        }
        const cookie = cookies[key]
        if (!cookie) {
            throw new ForbiddenException(`There is no such cookie ${key}`)
        }
        return cookie
    },
)
