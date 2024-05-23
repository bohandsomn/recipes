'use client'

import { useSyncExternalStore } from 'react'
import { IDispatch, IDispatchCallback, IUseDispatch, IUseState } from '@/types'
import {
    ICreateContextOptions,
    IState,
    IStateCreatorResult,
    IUseDispatchCallback,
    IUseStateContext,
} from './types'

export function stateCreator<State extends IState>(
    initialState: State,
    useStateContext: IUseStateContext<State>,
    options?: ICreateContextOptions,
): IStateCreatorResult<State> {
    const useState: IUseState<State> = <SelectorOutput>(
        selector = (state: State) => state,
    ) => {
        const eventBusState = useStateContext()
        if (!eventBusState) {
            throw new Error(
                `State ${options?.name ? options.name : ' '}not found`,
            )
        }
        const state = useSyncExternalStore<State | SelectorOutput>(
            eventBusState.subscribe,
            () => selector(eventBusState.get()),
            () => selector(initialState),
        )
        return state
    }
    const useDispatch: IUseDispatch<State> = () => {
        const eventBusState = useStateContext()
        if (!eventBusState) {
            throw new Error('State not found')
        }
        const dispatch: IDispatch<State> = (value) => {
            eventBusState.set(value)
        }
        return dispatch
    }
    const useDispatchCallback: IUseDispatchCallback<State> = <SelectorOutput>(
        selector: (state: State) => SelectorOutput,
    ) => {
        const state = useState(selector)
        const dispatch = useDispatch()
        const dispatchCallback: IDispatchCallback<State, SelectorOutput> = (
            callback,
        ) => {
            dispatch(callback(state))
        }
        return dispatchCallback
    }
    return [useState, useDispatch, useDispatchCallback]
}
