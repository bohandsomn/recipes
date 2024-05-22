import React from 'react'
import { fontHeader } from '@/fonts'
import { getLanguages } from '@/utils/languages'
import { Container } from '@/components/common'
import { WishRecipeList } from './WishRecipeList'

export const WishRecipeSection = async () => {
    const translate = await getLanguages()
    const span = translate('home.hero.wish')
    const restHeader = translate('home.hero.header')
    return (
        <Container className="space-y-2">
            <h1 className="text-4xl font-bold">
                <span className={`text-yellow-600 ${fontHeader.className}`}>
                    {span}
                </span>{' '}
                {restHeader}
            </h1>
            <WishRecipeList />
        </Container>
    )
}
