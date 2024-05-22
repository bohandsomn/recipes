import React from 'react'
import { getLanguages } from '@/utils/languages'

export const HomeRecipesHeader = async () => {
    const translate = await getLanguages()
    const header = translate('home.recipes.header')
    return (
        <h2 className="text-2xl">{header}</h2>
    )
}
