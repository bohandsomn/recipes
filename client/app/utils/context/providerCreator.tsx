'use client'

import { createContext, useContext } from 'react'
import { eventBusCreator } from './eventBusCreator'
import {
    IEventBus,
    IProvider,
    IProviderCreatorResult,
    IState,
    IUseStateContext,
} from './types'

export function providerCreator<State extends IState>(
    initialState: State,
): IProviderCreatorResult<State> {
    const useEventBus = eventBusCreator(initialState)
    const StateContext = createContext<IEventBus<State> | null>(null)
    const Provider: IProvider<State> = ({ data, children }) => {
        const eventBus = useEventBus(data)
        return (
            <StateContext.Provider value={eventBus}>
                {children}
            </StateContext.Provider>
        )
    }
    const useStateContext: IUseStateContext<State> = () => {
        const state = useContext(StateContext)
        return state
    }
    return {
        Provider,
        useStateContext,
    }
}
