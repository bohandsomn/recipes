import { cookies } from 'next/headers'
import { DEFAULT_EXPIRES } from '@/components'
import { getServerErrorMessage, HttpMethod, IAppApi } from '@/utils'
import {
    IActivateUserDto,
    IAuthService,
    ILogInUserDto,
    IRegisterUserDto,
    IServerErrorDto,
    ISetPasswordDto,
    IUserPayloadDto,
} from './types'

export class AuthService implements IAuthService {
    constructor(private readonly appApi: IAppApi) {}

    async registerUser(dto: IRegisterUserDto): Promise<IUserPayloadDto> {
        const { data, error } = await this.appApi.request<
            IUserPayloadDto,
            IServerErrorDto
        >({
            method: HttpMethod.POST,
            url: '/register',
            body: dto,
            withCredentials: true,
        })
        if (data) {
            cookies()
                .set('accessToken', data.accessToken, {
                    expires: new Date(Date.now() + DEFAULT_EXPIRES),
                })
                .set('refreshToken', data.refreshToken, {
                    expires: new Date(Date.now() + DEFAULT_EXPIRES),
                })
            return data
        }
        throw error
    }

    async logInUser(dto: ILogInUserDto): Promise<IUserPayloadDto> {
        const { data, error } = await this.appApi.request<
            IUserPayloadDto,
            IServerErrorDto
        >({
            method: HttpMethod.POST,
            url: '/log-in',
            body: dto,
            withCredentials: true,
        })
        if (data) {
            cookies()
                .set('accessToken', data.accessToken, {
                    expires: new Date(Date.now() + DEFAULT_EXPIRES),
                })
                .set('refreshToken', data.refreshToken, {
                    expires: new Date(Date.now() + DEFAULT_EXPIRES),
                })
            return data
        }
        throw error
    }

    async autoLogInUser(): Promise<IUserPayloadDto> {
        const accessToken = cookies().get('accessToken')?.value
        const { data, error } = await this.appApi.request<
            IUserPayloadDto,
            IServerErrorDto
        >({
            method: HttpMethod.POST,
            url: '/auto-log-in',
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        })
        if (data) {
            return data
        }
        throw error
    }

    async logOutUser(): Promise<void> {
        const { data, error } = await this.appApi.request<
            void,
            IServerErrorDto
        >({
            method: HttpMethod.POST,
            url: '/log-out',
            withCredentials: true,
        })
        if (data !== null) {
            cookies().delete('accessToken')
            cookies().delete('refreshToken')
            return data
        }
        throw error
    }

    async activateUser(dto: IActivateUserDto): Promise<string | null> {
        const { error } = await this.appApi.request<void, IServerErrorDto>({
            method: HttpMethod.POST,
            url: `/activate/${dto.activationLink}`,
            withCredentials: true,
        })
        return getServerErrorMessage(error)
    }

    async sendConfirmEmail(): Promise<void> {
        const accessToken = cookies().get('accessToken')?.value
        const { data, error } = await this.appApi.request<
            void,
            IServerErrorDto
        >({
            method: HttpMethod.POST,
            url: '/send-confirm-email',
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
        if (data !== null) {
            return data
        }
        throw error
    }

    async setPassword(dto: ISetPasswordDto): Promise<IUserPayloadDto> {
        const accessToken = cookies().get('accessToken')?.value
        const { data, error } = await this.appApi.request<
            IUserPayloadDto,
            IServerErrorDto
        >({
            method: HttpMethod.PATCH,
            url: '/password',
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            body: dto,
        })
        if (data) {
            cookies()
                .set('accessToken', data.accessToken, {
                    expires: new Date(Date.now() + DEFAULT_EXPIRES),
                })
                .set('refreshToken', data.refreshToken, {
                    expires: new Date(Date.now() + DEFAULT_EXPIRES),
                })
            return data
        }
        throw error
    }
}
