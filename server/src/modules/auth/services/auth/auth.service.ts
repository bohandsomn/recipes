import {
    ForbiddenException,
    Inject,
    Injectable,
    forwardRef,
} from '@nestjs/common'

import { MailService } from '@/modules/mail/services/mail/mail.service'
import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'
import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { UserTokenType } from '@/modules/user/constants/user-token-type'
import { IUserModel } from '@/modules/user/interfaces/user-model.interface'
import { UserPayloadDto } from '@/modules/user/dtos/user-payload-dto'
import { UserTokenService } from '@/modules/user/services/user-token/user-token.service'
import { UserService } from '@/modules/user/services/user/user.service'

import { IActivateUserInput } from '../../interfaces/activate-user-input.interface'
import { IAuthService } from '../../interfaces/auth-service.interface'
import { IAutoLogInUserInput } from '../../interfaces/auto-log-in-user-input.interface'
import { IExternalLogInUserInput } from '../../interfaces/external-log-in-user-input.interface'
import { ILogInUserInput } from '../../interfaces/log-in-user-input.interface'
import { IRefreshTokenInput } from '../../interfaces/refresh-token-input.interface'
import { IRegisterUserInput } from '../../interfaces/register-user-input.interface'
import { ISendConfirmEmailInput } from '../../interfaces/send-confirm-email-input.interface'
import { ActivationService } from '../activation/activation.service'
import { BcryptjsPasswordService } from '../bcryptjs-password/bcryptjs-password.service'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly activationService: ActivationService,
        private readonly passwordService: BcryptjsPasswordService,
        private readonly userTokenService: UserTokenService,
        private readonly appConfigService: AppConfigService,
        private readonly mailService: MailService,
        private readonly languagesService: I18nLanguagesService,
    ) { }

    async registerUser(input: IRegisterUserInput): Promise<UserPayloadDto> {
        const activationPayload = this.activationService.initialActivate()
        const hashedPassword = await this.passwordService.hash(input.password)
        const user = await this.userService.create({
            email: input.email,
            password: hashedPassword,
            ...activationPayload,
        })
        const clientUrl = this.appConfigService.get(Environment.CLIENT_URL)
        const activationLink = `${clientUrl}/activate/${user.activationLink}`
        this.mailService.confirmMail({
            email: user.email,
            activationLink,
        })
        const userPayload = this.getUserPayload(user)
        return userPayload
    }

    async logInUser(input: ILogInUserInput): Promise<UserPayloadDto> {
        const user = await this.userService.getOne(input)
        if (user.password) {
            const isCorrectPassword = await this.passwordService.compare(
                input.password,
                user.password,
            )
            if (!isCorrectPassword) {
                const errorMessage = this.languagesService.exception(
                    'auth.log-in.incorrect-password',
                )
                throw new ForbiddenException(errorMessage)
            }
        }
        const userPayload = this.getUserPayload(user)
        return userPayload
    }

    async autoLogInUser(input: IAutoLogInUserInput): Promise<UserPayloadDto> {
        const user = await this.userService.getOne({
            id: input.userId,
        })
        const userPayload = this.getUserPayload(user)
        return userPayload
    }

    async externalLogInUser(
        input: IExternalLogInUserInput,
    ): Promise<UserPayloadDto> {
        const user = await this.userService.getOne(input)
        const userPayload = this.getUserPayload(user)
        return userPayload
    }

    async refreshToken(input: IRefreshTokenInput): Promise<UserPayloadDto> {
        const userTokenPayload = this.userTokenService.verify({
            token: input.refreshToken,
            type: UserTokenType.REFRESH_TOKEN,
        })
        const user = await this.userService.getOne({
            id: userTokenPayload.userId,
        })
        const userPayload = this.getUserPayload(user)
        return userPayload
    }

    async activateUser(input: IActivateUserInput): Promise<void> {
        await this.activationService.activate(input.activationLink)
    }

    async sendConfirmEmail(input: ISendConfirmEmailInput): Promise<void> {
        const user = await this.userService.getOne({
            id: input.userId,
        })
        const clientUrl = this.appConfigService.get(Environment.CLIENT_URL)
        const activationLink = `${clientUrl}/activate/${user.activationLink}`
        this.mailService.confirmMail({
            email: user.email,
            activationLink,
        })
    }

    private getUserPayload(user: IUserModel): UserPayloadDto {
        const tokens = this.userTokenService.generate({
            userId: user.id,
            isActive: user.isActive,
            hasPassword: !!user.password,
        })
        return {
            email: user.email,
            isActive: user.isActive,
            hasPassword: !!user.password,
            ...tokens,
        }
    }
}
