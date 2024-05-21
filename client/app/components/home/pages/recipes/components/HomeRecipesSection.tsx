import React from 'react'
import { Container } from '@/components/common'
import { HomeRecipesHeader } from './HomeRecipesHeader'
import { HomeRecipeList } from './HomeRecipeList'
import { HomeRecipeLink } from './HomeRecipeLink'

export const HomeRecipesSection = () => {
    return (
        <Container id="popular-recipes">
            <HomeRecipesHeader />
            <HomeRecipeList />
            <HomeRecipeLink />
        </Container>
    )
}
