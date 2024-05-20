import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from 'axios'
import {
    IAppApi,
    IAppApiOptions,
    IFailureResponseDto,
    IRequestDto,
    ISuccessResponseDto,
} from './types'

export class AxiosAppApi implements IAppApi {
    private readonly api: AxiosInstance

    constructor(options?: IAppApiOptions) {
        let api: AxiosInstance
        if (!options) {
            api = axios.create()
        } else {
            const config: CreateAxiosDefaults = {
                responseType: 'json',
            }
            const { baseUrl, headers, refresher } = options
            if (baseUrl) {
                config.baseURL = baseUrl
            }
            if (headers) {
                config.headers = headers
            }
            api = axios.create(config)
            if (refresher) {
                api.interceptors.response.use(null, (error: AxiosError) => {
                    return refresher.solve({
                        previousResponse: error.response,
                        statusCode: error.response?.status || 500,
                        requestBack() {
                            return axios.request(error.config!)
                        },
                    })
                })
            }
        }
        this.api = api
    }

    async request<Data, Error>(
        dto: IRequestDto,
    ): Promise<ISuccessResponseDto<Data> | IFailureResponseDto<Error>> {
        try {
            const axiosResponse = await this.api.request<Data>({
                data: dto.body,
                params: dto.query,
                ...dto,
            })
            const data = axiosResponse.data
            return {
                data,
                error: null,
            }
        } catch (error) {
            let errorResponse: Error | null = null
            if (error instanceof AxiosError) {
                errorResponse = error.response?.data ?? null
            }
            return {
                data: null,
                error: errorResponse,
            }
        }
    }
}
