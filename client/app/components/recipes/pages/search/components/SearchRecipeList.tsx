'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useLanguages } from '@/utils/languages/useLanguages'
import { useRecipesState } from '@/context/preview'

export const SearchRecipeList = () => {
    const state = useRecipesState()
    const translate = useLanguages()
    const emptyErrorMessage = translate('recipes.search.empty')
    return (
        <RecipePreviewList 
            emptyErrorMessage={emptyErrorMessage} 
            {...state} 
        />
    )
}
