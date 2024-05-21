'use client'

import React, { FC } from 'react'
import { withAuth } from '@/components/auth'
import { HeaderLink } from './HeaderLink'
import { DashboardIcon, AuthIcon, WishIcon } from '@/components/common'
import { Page } from '@/constants'

interface IAuthLinks {
    wish: string
    dashboard: string
    auth: string
}

export const AuthLinks: FC<IAuthLinks> = withAuth(({ 
    isAuth,
    wish,
    dashboard,
    auth,
}) => {
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
})
