'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { withSetter } from '@/utils'
import { IAuthContext, IAuthState } from './types'
import { IUseDispatch, IUseState } from '@/types'

const useState = create<IAuthContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
    ),
)

export interface IAuthProviderProps extends PropsWithChildren {
    state: IAuthState
}

export const AuthProvider: FC<IAuthProviderProps> = ({ 
    children, 
    state 
}) => {
    const setState = useState((state) => state.setState)
    useEffect(() => {
        setState({
            isLoading: false,
            ...state,
        })
    }, [state])
    return <>{children}</>
}

// @ts-ignore
export const useAuthState: IUseState<IAuthContext> = (
    selector,
) => {
    return useState(selector)
}

export const useAuthDispatch: IUseDispatch<IAuthContext> = () => {
    const dispatch = useState((state) => state.setState)
    return dispatch
}
