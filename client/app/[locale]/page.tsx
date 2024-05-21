import React from 'react'
import { getRecipePreview } from '@/actions'
import { DEFAULT_PAGE, DEFAULT_SIZE, HeroSection, HomeRecipesProvider, HomeRecipesSection, SectionWrapper, SortRecipes } from '@/components'

const Page = async () => {
    const recipeList = await getRecipePreview({
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
        query: '',
        sort: SortRecipes.POPULAR,
    })
    return (
        <SectionWrapper>
            <HomeRecipesProvider state={recipeList}>
                <HeroSection />
                <HomeRecipesSection />
            </HomeRecipesProvider>
        </SectionWrapper>
    )
}

export default Page