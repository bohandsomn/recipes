import React from 'react'
import { Container } from '@/components/common'
import { HomeRecipesHeader } from './HomeRecipesHeader'
import { HomeRecipePreviewList } from './HomeRecipePreviewList'
import { HomeRecipeLink } from './HomeRecipeLink'

export const HomeRecipesSection = () => {
    return (
        <Container id="popular-recipes">
            <HomeRecipesHeader />
            <HomeRecipePreviewList />
            <HomeRecipeLink />
        </Container>
    )
}
