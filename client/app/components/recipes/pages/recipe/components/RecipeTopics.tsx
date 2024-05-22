'use client'

import React from 'react'
import { RecipeList } from './RecipeList'
import { useRecipeState } from '../context'
import { Container } from '@/components/common'

export const RecipeTopics = () => {
    const topics = useRecipeState((state) => state.data?.topics ?? [])
    return (
        <Container>
            <RecipeList list={topics} />
        </Container>
    )
}
