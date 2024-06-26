import React from 'react'
import { getRecipePreview } from '@/actions'
import {
    DEFAULT_PAGE,
    DEFAULT_SIZE,
    HeroSection,
    HomeRecipesSection,
    SectionWrapper,
    SortRecipes,
} from '@/components'
import { RecipesProvider } from '@/context'

const LocalePage = async () => {
    const recipeList = await getRecipePreview({
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
        query: '',
        sort: SortRecipes.POPULAR,
    })
    return (
        <SectionWrapper>
            <RecipesProvider state={recipeList}>
                <HeroSection />
                <HomeRecipesSection />
            </RecipesProvider>
        </SectionWrapper>
    )
}

export default LocalePage
