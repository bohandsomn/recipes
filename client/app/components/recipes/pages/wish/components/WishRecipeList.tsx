'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useLanguages } from '@/utils/languages/useLanguages'
import { useWishState } from '../context'

export const WishRecipeList = () => {
    const state = useWishState()
    const translate = useLanguages()
    const emptyErrorMessage = translate('recipes.wish.empty')
    return (
        <RecipePreviewList 
            emptyErrorMessage={emptyErrorMessage} 
            {...state} 
        />
    )
}
