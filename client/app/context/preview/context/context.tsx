'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IUseState } from '@/types'
import { withSetter } from '@/utils'
import { IRecipesContext, IRecipesState } from './types'

const useState = create<IRecipesContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
        {
            name: 'recipes',
        },
    ),
)

export interface IRecipesProviderProps extends PropsWithChildren {
    state: IRecipesState
}

export const RecipesProvider: FC<IRecipesProviderProps> = ({
    children,
    state,
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
export const useRecipesState: IUseState<IRecipesContext> = (selector) => {
    return useState(selector)
}
