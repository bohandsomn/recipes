import axios from 'axios'
import { configuration } from '@/config'
import { IUserPayloadDto } from '@/services'
import { IRefresherService, ISolveRefresherInput } from './types'

export class RefresherService implements IRefresherService {
    private isRefreshed = false

    async solve<S, F>({
        statusCode,
        previousResponse,
        requestBack,
    }: ISolveRefresherInput<S, F>): Promise<S> {
        const isNotUnauthorized = statusCode !== 401
        if (isNotUnauthorized || this.isRefreshed) {
            this.isRefreshed = false
            throw previousResponse
        }
        this.isRefreshed = true
        const hasResponse = await this.refresh()
        if (hasResponse) {
            return requestBack()
        }
        throw previousResponse
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
