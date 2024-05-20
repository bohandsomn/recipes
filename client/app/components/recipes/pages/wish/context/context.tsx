'use client'

import { FC, PropsWithChildren, useEffect } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { withSetter } from '@/utils'
import { IWishContext, IWishState } from './types'
import { IUseState } from '@/types'

const useState = create<IWishContext>()(
    devtools(
        withSetter((_) => ({
            data: null,
            isLoading: true,
            error: null,
        })),
    ),
)

export interface IWishProviderProps extends PropsWithChildren {
    state: IWishState
}

export const WishProvider: FC<IWishProviderProps> = ({ 
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
export const useWishState: IUseState<IWishContext> = (
    selector,
) => {
    return useState(selector)
}
