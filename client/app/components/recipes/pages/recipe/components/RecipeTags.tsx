'use client'

import React from 'react'
import { getUniqueList } from '@/components/recipes/utils'
import { useRecipeState } from '../context'
import { RecipeList } from './RecipeList'

export const RecipeTags = () => {
    const tags = useRecipeState((state) =>
        getUniqueList(state.data?.tags ?? []),
    )
    return <RecipeList list={tags} tag />
}
