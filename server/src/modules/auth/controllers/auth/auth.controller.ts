import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'

import { ClientRedirectInterceptor } from '@/interceptors/client-redirect/client-redirect.interceptor'
import { User } from '@/modules/user/decorators/user.decorator'
import { UserPayloadDto } from '@/modules/user/dtos/user-payload-dto'
import { AppValidationPipe } from '@/pipes/app-validation/app-validation.pipe'

import { RefreshToken } from '../../decorators/refresh-token.decorator'
import { ExternalUserDto } from '../../dtos/external-user-dto'
import { LogInUserDto } from '../../dtos/log-in-user-dto'
import { RegisterUserDto } from '../../dtos/register-user-dto'
import { AuthGuard } from '../../guards/auth/auth.guard'
import { GoogleOauthGuard } from '../../guards/google-oauth/google-oauth.guard'
import { ClearTokenInterceptor } from '../../interceptors/clear-token/clear-token.interceptor'
import { SaveTokenInterceptor } from '../../interceptors/save-token/save-token.interceptor'
import { IAuthController } from '../../interfaces/auth-controller.interface'
import { AuthService } from '../../services/auth/auth.service'

@Controller('auth')
export class AuthController implements IAuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UseInterceptors(SaveTokenInterceptor)
    async registerUser(
        @Body(AppValidationPipe) dto: RegisterUserDto,
    ): Promise<UserPayloadDto> {
        return this.authService.registerUser(dto)
    }

    @Post('log-in')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(SaveTokenInterceptor)
    async logInUser(
        @Body(AppValidationPipe) dto: LogInUserDto,
    ): Promise<UserPayloadDto> {
        return this.authService.logInUser(dto)
    }

    @Post('auto-log-in')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(SaveTokenInterceptor)
    @UseGuards(AuthGuard)
    async autoLogInUser(
        @User('userId') userId: number,
    ): Promise<UserPayloadDto> {
        return this.authService.autoLogInUser({ userId })
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(SaveTokenInterceptor)
    async refreshToken(
        @RefreshToken() refreshToken: string,
    ): Promise<UserPayloadDto> {
        return this.authService.refreshToken({ refreshToken })
    }

    @Post('log-out')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClearTokenInterceptor)
    async logOutUser(): Promise<void> {}

    @Post('activate/:link')
    async activateUser(@Param('link') activationLink: string): Promise<void> {
        return this.authService.activateUser({ activationLink })
    }

    @Post('send-confirm-email')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async sendConfirmEmail(@User('userId') userId: number): Promise<void> {
        return this.authService.sendConfirmEmail({ userId })
    }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async google() {}

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    @UseInterceptors(ClientRedirectInterceptor, SaveTokenInterceptor)
    async googleCallback(
        @User() user: ExternalUserDto,
    ): Promise<UserPayloadDto> {
        return this.authService.externalLogInUser(user)
    }
}
