export interface IDispatch<State> {
    /**
     * A function for updating data without binding to the state.
     * This function does not use state under the hood,
     * so the consumer component will not be rerender
     */
    (value: Partial<State>): void
}

export interface IDispatchCallback<State, SelectorOutput = State> {
    /**
     * A function for updating data that accepts a callback function with the previous state.
     * This function uses the state under the hood,
     * so the consumer context will be rerender
     */
    (callback: (value: SelectorOutput) => Partial<State>): void
}

/**
 * A hook to retrieve data from the context.
 * Use the `selector` to optimize components
 */
export interface IUseState<State> {
    (): State
    <SelectorOutput>(selector: (state: State) => SelectorOutput): SelectorOutput
}

/**
 * A hook to retrieve function for updating data without binding to the state
 */
export interface IUseDispatch<State> {
    (): IDispatch<State>
}
