export type IWithSetter<State> = State & {
    setState(state: Partial<State>): void
}
