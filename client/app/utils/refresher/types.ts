export interface ISolveRefresherInput<S, F> {
    requestBack(): Promise<S>
    previousResponse: F
    statusCode: number
}

export interface IRefresherService {
    solve<S, F>(input: ISolveRefresherInput<S, F>): Promise<S | F>
}
