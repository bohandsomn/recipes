'use client'

import { useCallback, useEffect, useRef } from 'react'
import { IEventBus, IState } from './types'

export function eventBusCreator<State extends IState>(exogenousState: State) {
    const useEventBus = (endogenousState?: State): IEventBus<State> => {
        const state = exogenousState ?? endogenousState
        const stateRef = useRef<State>(state!)
        const subscribersRef = useRef(new Set<() => void>())
        const get = useCallback(() => stateRef.current, [])
        const set = useCallback((value: Partial<State>) => {
            stateRef.current = { ...stateRef.current, ...value }
            subscribersRef.current.forEach((callback) => callback())
        }, [])
        const subscribe = useCallback((callback: () => void) => {
            subscribersRef.current.add(callback)
            return () => subscribersRef.current.delete(callback)
        }, [])
        useEffect(() => {
            if (endogenousState) {
                set(endogenousState)
            }
        }, [endogenousState])
        return {
            get,
            set,
            subscribe,
        }
    }
    return useEventBus
}
