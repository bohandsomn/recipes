'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IUseState } from '@/types'
import { withSetter } from '@/utils'
import { IRecipeContext, IRecipeState } from './types'

const useState = create<IRecipeContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
        {
            name: 'recipe',
        },
    ),
)

export interface IRecipeProviderProps extends PropsWithChildren {
    state: IRecipeState
}

export const RecipeProvider: FC<IRecipeProviderProps> = ({
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
export const useRecipeState: IUseState<IRecipeContext> = (selector) => {
    return useState(selector)
}
