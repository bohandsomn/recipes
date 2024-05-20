'use client'

import React, { FC } from 'react'
import { withAuth } from '@/components/auth'
import { HeaderLink } from './HeaderLink'
import { DashboardIcon, AuthIcon, WishIcon } from '@/components/common'
import { Page } from '@/constants'
import { Locale } from '@/utils'

interface IAuthLinks {
    wish: string
    dashboard: string
    auth: string
    locale: Locale
}

export const AuthLinks: FC<IAuthLinks> = withAuth(({ 
    isAuth,
    wish,
    dashboard,
    auth,
    locale,
}) => {
    if (!isAuth) {
        return (
            <HeaderLink 
                icon={<AuthIcon />} 
                title={auth} 
                path={`${locale}/${Page.AUTH}`} 
            />
        )
    }
    return (
        <>
            <HeaderLink 
                icon={<WishIcon />} 
                title={wish} 
                path={`${locale}/${Page.WISH}`} 
            />
            <HeaderLink 
                icon={<DashboardIcon />} 
                title={dashboard} 
                path={`${locale}/${Page.DASHBOARD}`} 
            />
        </>
    )
})
