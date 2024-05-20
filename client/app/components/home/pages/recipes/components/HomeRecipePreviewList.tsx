'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useLanguages } from '@/utils'
import { useHomeRecipesState } from '../context'

export const HomeRecipePreviewList = () => {
    const state = useHomeRecipesState()
    const translate = useLanguages()
    const emptyErrorMessage = translate('home.recipes.empty')
    return (
        <RecipePreviewList 
            emptyErrorMessage={emptyErrorMessage} 
            {...state} 
        />
    )
}
