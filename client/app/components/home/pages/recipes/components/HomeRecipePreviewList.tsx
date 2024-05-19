'use client'

import React from 'react'
import { RecipePreviewList } from '@/components/recipes'
import { useHomeRecipesState } from '../context'

export const HomeRecipePreviewList = () => {
    const state = useHomeRecipesState()
    return (
        <RecipePreviewList {...state} />
    )
}
