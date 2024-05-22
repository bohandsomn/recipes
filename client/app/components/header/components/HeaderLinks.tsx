import React from 'react'
import { SearchIcon } from '@/components/common'
import { getLanguages } from '@/utils/languages'
import { Page } from '@/constants'
import { HeaderLink } from './HeaderLink'
import { AuthLinks } from './AuthLinks'

export const HeaderLinks = async () => {
    const translate = await getLanguages()
    const wish = translate('header.icons.wish')
    const search = translate('header.icons.search')
    const dashboard = translate('header.icons.dashboard')
    const auth = translate('header.icons.auth')
    return (
        <ul className="flex flex-row space-x-2">
            <HeaderLink 
                icon={<SearchIcon />} 
                title={search} 
                path={`/${Page.RECIPES}`} 
            />
            <AuthLinks 
                wish={wish} 
                dashboard={dashboard} 
                auth={auth}
            />
        </ul>
    )
}
