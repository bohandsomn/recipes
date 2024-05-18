import { configuration } from '@/config'
import { AxiosAppApi, IAppApi } from '@/utils'
import { RefresherService } from '@/utils/refresher'

export const authApi: IAppApi = new AxiosAppApi({
    baseUrl: configuration.authServerUrl,
    refresher: new RefresherService(),
})
