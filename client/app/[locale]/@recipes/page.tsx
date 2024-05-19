import React from 'react'
import { getRecipePreview } from '@/actions'
import { DEFAULT_PAGE, DEFAULT_SIZE, HomeRecipesProvider, HomeRecipesSection, SortRecipes } from '@/components'

const Page = async () => {
    const recipeList = await getRecipePreview({
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE,
        query: '',
        sort: SortRecipes.POPULAR,
    })
    return (
        <HomeRecipesProvider state={recipeList}>
            <HomeRecipesSection />
        </HomeRecipesProvider>
    )
}

export default Page