export interface ISolveRefresherInput<Response> {
    requestBack(): Promise<Response>
    previousResponse: Response
    statusCode: number
}

export interface IRefresherService {
    solve<Response>(input: ISolveRefresherInput<Response>): Promise<Response>
}
