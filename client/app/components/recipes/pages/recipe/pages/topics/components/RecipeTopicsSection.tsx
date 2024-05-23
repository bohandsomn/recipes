'use client'

import React from 'react'
import { Container } from '@/components/common'
import { getUniqueList } from '@/components/recipes/utils'
import { RecipeList } from '../../../components/RecipeList'
import { useRecipeState } from '../../../context'

export const RecipeTopicsSection = () => {
    const topics = useRecipeState((state) => getUniqueList(state.data?.topics ?? []))
    return (
        <Container>
            <RecipeList list={topics} />
        </Container>
    )
}
