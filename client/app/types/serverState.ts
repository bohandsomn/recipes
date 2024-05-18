export interface ISuccessfulServerResponse<Data> {
    readonly data: Data
    readonly error: null
}

export interface IFailureServerResponse {
    readonly data: null
    readonly error: string
}

export type IServerResponse<Data> = ISuccessfulServerResponse<Data> | IFailureServerResponse
