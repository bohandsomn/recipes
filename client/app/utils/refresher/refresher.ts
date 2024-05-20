import axios from 'axios'
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
        const hasResponse = await this.refresh()
        if (hasResponse) {
            return requestBack()
        }
        return previousResponse
    }

    private async refresh(): Promise<boolean> {
        try {
            const axiosResponse = await axios.post<IUserPayloadDto>(
                `${configuration.authServerUrl}/refresh`,
                null,
                {
                    withCredentials: true,
                    responseType: 'json',
                },
            )
            const userPayload = axiosResponse.data
            const hasResponse = !!userPayload
            return hasResponse
        } catch (error) {
            return false
        }
    }
}
