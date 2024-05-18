import { configuration } from '@/config'
import { AxiosAppApi, IAppApi, RefresherService } from '@/utils'

export const authApi: IAppApi = new AxiosAppApi({
    baseUrl: configuration.authServerUrl,
    refresher: new RefresherService(),
})
