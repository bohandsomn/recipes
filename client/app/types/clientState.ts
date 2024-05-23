export interface ISuccessfulClientResponse<Data> {
    readonly data: Data
    readonly isLoading: false
    readonly error: null
}

export interface IPendingClientResponse {
    readonly data: null
    readonly isLoading: true
    readonly error: null
}

export interface IFailureClientResponse {
    readonly data: null
    readonly isLoading: false
    readonly error: string
}

export type IClientResponse<Data> =
    | ISuccessfulClientResponse<Data>
    | IPendingClientResponse
    | IFailureClientResponse
