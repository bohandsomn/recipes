'use client'

import React, { FC } from 'react'
import { withAuth } from '@/components/auth'
import { HeaderLink } from './HeaderLink'
import { AccountIcon, WishIcon } from '@/components/common'
import { Page } from '@/constants'
import { Locale } from '@/utils'

interface IAuthLinks {
    wish: string
    auth: string
    locale: Locale
}

export const AuthLinks: FC<IAuthLinks> = withAuth(({ 
    isAuth,
    wish,
    auth,
    locale,
}) => {
    if (!isAuth) {
        return null
    }
    return (
        <>
            <HeaderLink 
                icon={<WishIcon />} 
                title={wish} 
                path={`${locale}/${Page.WISH}`} 
            />
            <HeaderLink 
                icon={<AccountIcon />} 
                title={auth} 
                path={`${locale}/${Page.AUTH}`} 
            />
        </>
    )
})
