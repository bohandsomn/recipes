import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import { parseAcceptLanguage } from '@/utils'
import { Page } from '@/constants'
import { getLanguages } from '@/utils/languages/server'

export const HomeRecipeLink = async () => {
    const acceptLanguage = headers().get('Accept-Language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages(locale)
    const link = translate('home.recipes.link')
    return (
        <div className="flex justify-center">
            <Link href={`/${locale}/${Page.RECIPES}`} className="button block">{link}</Link>
        </div>
    )
}
