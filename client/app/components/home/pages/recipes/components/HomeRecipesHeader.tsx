import { headers } from 'next/headers'
import React from 'react'
import { parseAcceptLanguage } from '@/utils'
import { getLanguages } from '@/utils/languages/server'

export const HomeRecipesHeader = async () => {
    const acceptLanguage = headers().get('Accept-Language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages(locale)
    const header = translate('home.recipes.header')
    return (
        <h2 className="text-2xl">{header}</h2>
    )
}
