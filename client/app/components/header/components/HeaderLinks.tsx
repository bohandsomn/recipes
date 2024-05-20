import React from 'react'
import { headers } from 'next/headers'
import { SearchIcon } from '@/components/common'
import { parseAcceptLanguage } from '@/utils'
import { getLanguages } from '@/utils/languages/server'
import { Page } from '@/constants'
import { HeaderLink } from './HeaderLink'
import { AuthLinks } from './AuthLinks'

export const HeaderLinks = async () => {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages(locale)
    const wish = translate('header.icons.wish')
    const search = translate('header.icons.search')
    const dashboard = translate('header.icons.dashboard')
    const auth = translate('header.icons.auth')
    return (
        <ul className="flex flex-row space-x-2">
            <HeaderLink 
                icon={<SearchIcon />} 
                title={search} 
                path={`${locale}/${Page.RECIPES}`} 
            />
            <AuthLinks 
                wish={wish} 
                dashboard={dashboard} 
                auth={auth}
                locale={locale} 
            />
        </ul>
    )
}
