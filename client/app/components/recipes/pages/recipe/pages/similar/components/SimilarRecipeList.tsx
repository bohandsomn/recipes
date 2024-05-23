'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useRecipesState } from '@/context/preview'
import { useLanguages } from '@/utils/languages/useLanguages'

export const SimilarRecipeList = () => {
    const state = useRecipesState()
    const translate = useLanguages()
    const emptyErrorMessage = translate('recipe.similar.empty')
    return (
        <RecipePreviewList emptyErrorMessage={emptyErrorMessage} {...state} />
    )
}
