import axios from 'axios'
import { cookies } from 'next/headers'
import { configuration } from '@/config'
import { IUserPayloadDto } from '@/services'
import { IRefresherService, ISolveRefresherInput } from './types'

export class RefresherService implements IRefresherService {
    private isRefreshed = false

    async solve<Response>({
        statusCode,
        previousResponse,
        requestBack,
    }: ISolveRefresherInput<Response>): Promise<Response> {
        const isNotUnauthorized = statusCode !== 401
        if (isNotUnauthorized || this.isRefreshed) {
            this.isRefreshed = false
            return previousResponse
        }
        this.isRefreshed = true
        const accessToken = await this.refresh()
        if (typeof accessToken === 'string') {
            cookies().set('accessToken', accessToken)
        } else {
            cookies().delete('accessToken')
        }
        if (accessToken) {
            return requestBack()
        }
        return previousResponse
    }

    private async refresh(): Promise<string | null> {
        try {
            const axiosResponse = await axios.post<IUserPayloadDto>(
                `${configuration.authServerUrl}/refresh`,
                null,
                {
                    withCredentials: true,
                    responseType: 'json',
                },
            )
            const accessToken = axiosResponse.data.accessToken
            return accessToken
        } catch (error) {
            return null
        }
    }
}
