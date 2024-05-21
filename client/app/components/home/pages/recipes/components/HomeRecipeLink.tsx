import Link from 'next/link'
import React from 'react'
import { Page } from '@/constants'
import { getLanguages } from '@/utils/languages/getLanguages'

export const HomeRecipeLink = async () => {
    const translate = await getLanguages()
    const link = translate('home.recipes.link')
    return (
        <div className="flex justify-center">
            <Link href={`/${Page.RECIPES}`} className="button block">{link}</Link>
        </div>
    )
}
