'use client'

import { FC } from 'react'
import { useAuthState } from '../context'

export type IPropsWithAuth<Props> = Props & {
    isAuth: boolean
}

export function withAuth<Props extends {}>(Component: FC<IPropsWithAuth<Props>>): FC<Props> {
    const Wrapper: FC<Props> = (props) => {
        const isAuth = useAuthState((state) => state.data !== null)
        return <Component isAuth={isAuth} {...props} />
    }
    return Wrapper
}
