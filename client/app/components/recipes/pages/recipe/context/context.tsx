'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { withSetter } from '@/utils'
import { IRecipeContext, IRecipeState } from './types'
import { IUseState } from '@/types'
import { client } from '@/context'
import { GET_USER_RECIPE_PREVIEW } from '@/graphql'
import { IRecipeListPreview } from '@/components/recipes/types'

const useState = create<IRecipeContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
    ),
)

export interface IRecipeProviderProps extends PropsWithChildren {
    state: IRecipeState
}

export const RecipeProvider: FC<IRecipeProviderProps> = ({ 
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
export const useRecipeState: IUseState<IRecipeContext> = (
    selector,
) => {
    return useState(selector)
}
