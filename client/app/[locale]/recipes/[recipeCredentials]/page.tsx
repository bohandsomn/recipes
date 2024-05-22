import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import { getSimilarRecipePreview } from '@/actions'
import { IRecipe } from '@/components'
import { mockRecipe } from '@/components/recipes/__mock__'
import { RecipesProvider } from '@/context/preview'
import { IServerResponse } from '@/types'
import { RecipeProvider } from '@/components/recipes/pages/recipe/context'
import { RecipeHeroSection } from '@/components/recipes/pages/recipe'

interface IRecipeProps {
    params: {
        recipeCredentials: string
    }
}

export async function generateMetadata({ 
    params: {
        recipeCredentials
    }
}: IRecipeProps): Promise<Metadata> {
    // const recipe = await getRecipe(recipeCredentials)
    const { data: recipe }: IServerResponse<IRecipe> = {
        data: mockRecipe,
        error: null,
    }
    if (!recipe) {
        return notFound()
    }
    return {
        title: recipe.name,
        keywords: recipe.keywords,
        description: recipe.description,
    }
}

const RecipePage: FC<IRecipeProps> = async ({
    params: {
        recipeCredentials
    }
}) => {
    // const recipe = await getRecipe(recipeCredentials)
    const recipe = {
        data: mockRecipe,
        error: null,
    }
    if (!recipe.data) {
        return notFound()
    }
    const similarRecipes = await getSimilarRecipePreview(recipeCredentials)
    return (
        <RecipeProvider state={recipe}>
            <RecipesProvider state={similarRecipes}>
                <RecipeHeroSection />
            </RecipesProvider>
        </RecipeProvider>
    )
}

export default RecipePage