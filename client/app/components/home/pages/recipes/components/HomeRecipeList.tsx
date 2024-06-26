'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useRecipesState } from '@/context/preview/context'
import { useLanguages } from '@/utils/languages/useLanguages'

export const HomeRecipeList = () => {
    const state = useRecipesState()
    const translate = useLanguages()
    const emptyErrorMessage = translate('home.recipes.empty')
    return (
        <RecipePreviewList emptyErrorMessage={emptyErrorMessage} {...state} />
    )
}
