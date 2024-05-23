import { FC, PropsWithChildren } from 'react'
import { IDispatchCallback, IUseDispatch, IUseState } from '@/types'

/**
 * A base state that you need to extend your own states
 */
export type IState = Record<string | number | symbol, unknown>
/**
 * A context core that works under the hood and through which optimization is achieved
 */
export interface IEventBus<Store extends IState> {
    get: () => Store
    set: (value: Partial<Store>) => void
    subscribe: (callback: () => void) => () => void
}
export interface IProviderProps<State extends IState = IState>
    extends PropsWithChildren {
    /**
     * Data that you can provide to the provider
     * You can also provide your initial data to the optimal context creation function
     * If there is no such possibility, then there is an opportunity to transfer data directly to the provider
     */
    data?: State
}
/**
 * A hook to retrieve function for updating data that accepts a callback function with the previous state
 */
export interface IUseDispatchCallback<State extends IState> {
    <SelectorOutput>(
        callback: (state: State) => SelectorOutput,
    ): IDispatchCallback<State, SelectorOutput>
}
export interface IUseStateContext<State extends IState> {
    (): IEventBus<State> | null
}
export type IProvider<State extends IState> = FC<IProviderProps<State>>
export interface IProviderCreatorResult<State extends IState> {
    Provider: IProvider<State>
    useStateContext: IUseStateContext<State>
}
export type ICreateContextResult<State extends IState> = [
    IProvider<State>,
    IUseState<State>,
    IUseDispatch<State>,
    IUseDispatchCallback<State>,
]
export type IStateCreatorResult<State extends IState> = [
    IUseState<State>,
    IUseDispatch<State>,
    IUseDispatchCallback<State>,
]
export interface ICreateContextOptions {
    name?: string
}
