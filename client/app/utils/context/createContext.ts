import { providerCreator } from './providerCreator'
import { stateCreator } from './stateCreator'
import { ICreateContextOptions, ICreateContextResult, IState } from './types'

export function createContext<State extends IState>(
    initialState: State,
    options?: ICreateContextOptions,
): ICreateContextResult<State> {
    const { Provider, useStateContext } = providerCreator(initialState)
    const [useState, useDispatch, useDispatchCallback] = stateCreator(
        initialState,
        useStateContext,
        options,
    )
    return [Provider, useState, useDispatch, useDispatchCallback]
}
