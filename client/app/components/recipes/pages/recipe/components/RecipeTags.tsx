'use client'

import React from 'react'
import { RecipeList } from './RecipeList'
import { useRecipeState } from '../context'

export const RecipeTags = () => {
    const tags = useRecipeState((state) => state.data?.tags ?? [])
    return (
        <RecipeList list={tags} tag />
    )
}
