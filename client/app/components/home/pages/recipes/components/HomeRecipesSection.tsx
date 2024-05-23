import React from 'react'
import { Container } from '@/components/common'
import { HomeRecipeLink } from './HomeRecipeLink'
import { HomeRecipeList } from './HomeRecipeList'
import { HomeRecipesHeader } from './HomeRecipesHeader'

export const HomeRecipesSection = () => {
    return (
        <Container id="popular-recipes">
            <HomeRecipesHeader />
            <HomeRecipeList />
            <HomeRecipeLink />
        </Container>
    )
}
