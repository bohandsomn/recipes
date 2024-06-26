import React from 'react'
import { Container } from '@/components/common'
import { fontHeader } from '@/fonts'
import { getLanguages } from '@/utils/languages'
import { SearchRecipeForm } from './SearchRecipeForm'
import { SearchRecipeList } from './SearchRecipeList'
import { SearchRecipePages } from './SearchRecipePages'

export const SearchRecipeSection = async () => {
    const translate = await getLanguages()
    const span = translate('home.hero.search')
    const restHeader = translate('home.hero.header')
    return (
        <Container className="space-y-2">
            <h1 className="text-4xl font-bold">
                <span className={`text-yellow-600 ${fontHeader.className}`}>
                    {span}
                </span>{' '}
                {restHeader}
            </h1>
            <SearchRecipeForm />
            <SearchRecipeList />
            <SearchRecipePages />
        </Container>
    )
}
