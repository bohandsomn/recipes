import React, { FC } from 'react'
import { getRecipePreview } from '@/actions'
import { DEFAULT_PAGE, DEFAULT_SIZE, SortRecipes, checkSortRecipes } from '@/components'
import { SearchRecipeSection } from '@/components/recipes/pages/search'
import { RecipesProvider } from '@/components/recipes/pages/preview'

interface IRecipesProps {
    searchParams: {
        page?: string
        size?: string
        query?: string
        sort?: string
    }
}

const Recipes: FC<IRecipesProps> = async ({
    searchParams: {
        page,
        query = '',
        sort,
    }
}) => {
    const isSort = checkSortRecipes(sort)
    const checkedSort = isSort ? sort : SortRecipes.POPULAR
    const pageNumber = parseInt(page || (DEFAULT_PAGE + 1).toString())
    const recipeList = await getRecipePreview({
        page: pageNumber - 1,
        size: DEFAULT_SIZE,
        query,
        sort: checkedSort,
    })
    return (
        <RecipesProvider state={recipeList}>
            <SearchRecipeSection />
        </RecipesProvider>
    )
}

export default Recipes