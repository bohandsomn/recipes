'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { withSetter } from '@/utils'
import { IHomeRecipesContext, IHomeRecipesState } from './types'
import { IUseState } from '@/types'

const useState = create<IHomeRecipesContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
    ),
)

export interface IHomeRecipesProviderProps extends PropsWithChildren {
    state: IHomeRecipesState
}

export const HomeRecipesProvider: FC<IHomeRecipesProviderProps> = ({ 
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
export const useHomeRecipesState: IUseState<IHomeRecipesContext> = (
    selector,
) => {
    return useState(selector)
}
