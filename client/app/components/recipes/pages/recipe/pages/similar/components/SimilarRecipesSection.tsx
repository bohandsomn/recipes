import React from 'react'
import { Container } from '@/components/common'
import { SimilarRecipeList } from './SimilarRecipeList'

export const SimilarRecipesSection = async () => {
    return (
        <Container>
            <SimilarRecipeList />
        </Container>
    )
}
