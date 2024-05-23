import { IRefresherService } from '../refresher'
import { HttpMethod } from './constants'

export interface IHeaders extends Partial<Record<string, string>> {
    authorization?: string
}

export interface IQuery
    extends Partial<Record<string, string | number | boolean>> {}

export interface IRequestDto {
    url: string
    method: HttpMethod
    body?: unknown
    headers?: IHeaders
    query?: IQuery
    withCredentials?: boolean
}

export interface ISuccessResponseDto<Data> {
    data: Data
    error: null
}

export interface IFailureResponseDto<Error> {
    data: null
    error: Error | null
}

export interface IAppApiOptions {
    baseUrl?: string
    headers?: IHeaders
    refresher?: IRefresherService
}

export interface IAppApi {
    request<Data, Error>(
        dto: IRequestDto,
    ): Promise<ISuccessResponseDto<Data> | IFailureResponseDto<Error>>
}
