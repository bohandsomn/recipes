'use client'

import React, { FC } from 'react'
import { useAuthState } from '@/components/auth/context'
import { AuthIcon, DashboardIcon, WishIcon } from '@/components/common'
import { Page } from '@/constants'
import { HeaderLink } from './HeaderLink'

interface IAuthLinks {
    wish: string
    dashboard: string
    auth: string
}

export const AuthLinks: FC<IAuthLinks> = ({ wish, dashboard, auth }) => {
    const isAuth = useAuthState((state) => !!state.data)
    if (!isAuth) {
        return (
            <HeaderLink
                icon={<AuthIcon />}
                title={auth}
                path={`/${Page.AUTH}`}
            />
        )
    }
    return (
        <>
            <HeaderLink
                icon={<WishIcon />}
                title={wish}
                path={`/${Page.WISH}`}
            />
            <HeaderLink
                icon={<DashboardIcon />}
                title={dashboard}
                path={`/${Page.DASHBOARD}`}
            />
        </>
    )
}
