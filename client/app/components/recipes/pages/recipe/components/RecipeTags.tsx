'use client'

import React from 'react'
import { RecipeList } from './RecipeList'
import { getUniqueList } from '@/components/recipes/utils'
import { useRecipeState } from '../context'

export const RecipeTags = () => {
    const tags = useRecipeState((state) => getUniqueList(state.data?.tags ?? []))
    return (
        <RecipeList list={tags} tag />
    )
}
