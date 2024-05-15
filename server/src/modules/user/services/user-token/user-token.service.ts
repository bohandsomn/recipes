import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { Environment } from '@/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/service/modules/app-config/services/app-config/app-config.service'
import { LoggerService } from '@/service/modules/logger/services/logger/logger.service'

import { UserTokenType } from '../../constants/user-token-type'
import { IUserTokenPayload } from '../../interfaces/user-token-payload.interface'
import { IUserTokenService } from '../../interfaces/user-token-service.interface'
import { IUserTokens } from '../../interfaces/user-tokens.interface'
import { IVerifyToken } from '../../interfaces/verify-token.interface'

@Injectable()
export class UserTokenService implements IUserTokenService {
    constructor(
        private readonly languagesService: I18nLanguagesService,
        private readonly jwtService: JwtService,
        private readonly loggerService: LoggerService,
        private readonly appConfigService: AppConfigService,
    ) { }

    generate(input: IUserTokenPayload): IUserTokens {
        const accessToken = this.generateToken(
            input,
            UserTokenType.ACCESS_TOKEN,
        )
        const refreshToken = this.generateToken(
            input,
            UserTokenType.REFRESH_TOKEN,
        )
        return {
            accessToken,
            refreshToken,
        }
    }

    split(header: string): string {
        if (!header) {
            const errorMessage =
                this.languagesService.exception('user-token.split.not-found-header')
            throw new UnauthorizedException(errorMessage)
        }
        const [bearer, token] = header.split(' ')
        const isBearer = bearer === 'Bearer'
        const isEmptyToken = token === undefined || token === ''
        if (!isBearer || isEmptyToken) {
            const errorMessage = this.languagesService.exception(
                'user-token.split.not-found-token',
            )
            throw new UnauthorizedException(errorMessage)
        }
        return token
    }

    verify(input: IVerifyToken): IUserTokenPayload {
        try {
            const secretKey = this.getSecretKey(input.type)
            const userTokenPayload = this.jwtService.verify<IUserTokenPayload>(
                input.token,
                {
                    secret: secretKey,
                },
            )
            if (!userTokenPayload) {
                const errorMessage = this.languagesService.exception(
                    'user-token.verify.payload-not-valid',
                )
                throw new UnauthorizedException(errorMessage)
            }
            return userTokenPayload
        } catch (error) {
            this.loggerService.error(error)
            if (error instanceof HttpException) {
                throw error
            }
            const errorMessage = this.languagesService.exception(
                'user-token.verify.unknown',
            )
            throw new UnauthorizedException(errorMessage)
        }
    }

    private generateToken(
        payload: IUserTokenPayload,
        type: UserTokenType,
    ): string {
        try {
            const secret = this.getSecretKey(type)
            const expiresIn = this.getExpiresIn(type)
            const token = this.jwtService.sign(payload, {
                secret: secret,
                expiresIn: expiresIn,
            })
            return token
        } catch (error) {
            this.loggerService.error(error)
            if (error instanceof HttpException) {
                throw error
            }
            const errorMessage = this.languagesService.exception(
                'user-token.generate-token.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    private getSecretKey(type: UserTokenType): string {
        if (type === UserTokenType.ACCESS_TOKEN) {
            return this.appConfigService.get(Environment.JWT_ACCESS_SECRET_KEY)
        } else if (type === UserTokenType.REFRESH_TOKEN) {
            return this.appConfigService.get(Environment.JWT_REFRESH_SECRET_KEY)
        } else {
            const errorMessage = this.languagesService.exception(
                'user-token.get-secret-key.unknown',
            )
            throw new UnauthorizedException(errorMessage)
        }
    }

    private getExpiresIn(type: UserTokenType): string {
        if (type === UserTokenType.ACCESS_TOKEN) {
            return this.appConfigService.get(Environment.JWT_ACCESS_EXPIRES_IN)
        } else if (type === UserTokenType.REFRESH_TOKEN) {
            return this.appConfigService.get(Environment.JWT_REFRESH_EXPIRES_IN)
        } else {
            const errorMessage = this.languagesService.exception(
                'user-token.get-expires-in.unknown',
            )
            throw new UnauthorizedException(errorMessage)
        }
    }
}
