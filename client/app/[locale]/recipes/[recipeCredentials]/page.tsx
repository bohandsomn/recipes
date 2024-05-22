import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import { Container } from '@/components'
import { RecipeProvider } from '@/components/recipes/pages/recipe/context'
import { getRecipe, getSimilarRecipePreview } from '@/actions'
import { RecipesProvider } from '@/context/preview'
import { IngredientsSection, RecipeHeroSection, RecipeTopics, SimilarRecipesSection, StagesSection, VideoSection } from '@/components/recipes/pages'

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
    const { data: recipe } = await getRecipe(recipeCredentials)
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
    const recipe = await getRecipe(recipeCredentials)
    if (!recipe.data) {
        return notFound()
    }
    const similarRecipes = await getSimilarRecipePreview(recipeCredentials)
    return (
        <RecipeProvider state={recipe}>
            <RecipesProvider state={similarRecipes}>
                <RecipeHeroSection />
                <RecipeTopics />
                <Container className="grid lg:grid-cols-2">
                    <div className="order-1 lg:order-[0]">
                        <IngredientsSection />
                        <StagesSection />
                    </div>
                    <VideoSection />
                </Container>
                <SimilarRecipesSection />
            </RecipesProvider>
        </RecipeProvider>
    )
}

export default RecipePage