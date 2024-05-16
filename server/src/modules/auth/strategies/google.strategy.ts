import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy, VerifyCallback } from 'passport-google-oauth2'

import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly appConfigService: AppConfigService) {
        const clientID = appConfigService.get(Environment.GOOGLE_CLIENT_ID)
        const clientSecret = appConfigService.get(
            Environment.GOOGLE_CLIENT_SECRET,
        )
        const serverUrl = appConfigService.get(Environment.SERVER_URL)
        const callbackURL = `${serverUrl}/auth/google/callback`
        super({
            clientID,
            clientSecret,
            callbackURL,
            scope: ['profile', 'email'],
        })
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        { id, emails }: any,
        done: VerifyCallback,
    ): Promise<any> {
        done(null, {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
        })
    }
}
