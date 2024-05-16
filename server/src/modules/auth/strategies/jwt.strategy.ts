import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'

export type JwtPayload = {
    sub: string
    email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly appConfigService: AppConfigService) {
        const secretOrKey = appConfigService.get(
            Environment.JWT_REFRESH_SECRET_KEY,
        )
        super({
            ignoreExpiration: false,
            secretOrKey: secretOrKey,
            jwtFromRequest: (request: Request) => {
                let token = null
                if (request && request.cookies) {
                    token = request.cookies['access_token']
                }
                return (
                    token || ExtractJwt.fromAuthHeaderAsBearerToken()(request)
                )
            },
        })
    }

    async validate(payload: JwtPayload) {
        return {
            id: payload.sub,
            email: payload.email,
        }
    }
}
