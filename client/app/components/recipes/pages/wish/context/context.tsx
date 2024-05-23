'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IRecipeListPreview } from '@/components/recipes/types'
import { client } from '@/context'
import { GET_USER_RECIPE_PREVIEW } from '@/graphql'
import { IUseState } from '@/types'
import { withSetter } from '@/utils'
import { IWishContext, IWishState } from './types'

const useState = create<IWishContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
        {
            name: 'wish',
        },
    ),
)

export interface IWishProviderProps extends PropsWithChildren {
    state: IWishState
}

export const WishProvider: FC<IWishProviderProps> = ({ children, state }) => {
    const setState = useState((state) => state.setState)
    useEffect(() => {
        return client.cache.watch<{ getUserRecipeList: IRecipeListPreview }>({
            query: GET_USER_RECIPE_PREVIEW,
            callback(data) {
                const wishList = data.result?.getUserRecipeList
                if (!wishList) {
                    return
                }
                setState({
                    data: wishList,
                    isLoading: false,
                    error: null,
                })
            },
            optimistic: true,
        })
    }, [])
    useEffect(() => {
        setState({
            isLoading: false,
            ...state,
        })
    }, [state])
    return <>{children}</>
}

// @ts-ignore
export const useWishState: IUseState<IWishContext> = (selector) => {
    return useState(selector)
}
