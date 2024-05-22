'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useLanguages } from '@/utils/languages/useLanguages'
import { useRecipesState } from '@/components/recipes/pages/preview/context'

export const HomeRecipeList = () => {
    const state = useRecipesState()
    const translate = useLanguages()
    const emptyErrorMessage = translate('home.recipes.empty')
    return (
        <RecipePreviewList 
            emptyErrorMessage={emptyErrorMessage} 
            {...state} 
        />
    )
}
