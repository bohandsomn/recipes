'use client'

import React from 'react'
import Image from 'next/image'
import { Container, Hero } from '@/components/common'
import { useRecipeState } from '../../../context'
import { FiveStars, Price, Time, WishRecipe } from '@/components/recipes/components'
import { RecipeHeroSkeleton } from './RecipeHeroSkeleton'

export const RecipeHeroSection = () => {
    const name = useRecipeState((state) => state.data?.name!)
    const image = useRecipeState((state) => state.data?.image!)
    const recipeCredentials = useRecipeState((state) => state.data?.recipeCredentials!)
    const description = useRecipeState((state) => state.data?.description)
    const time = useRecipeState((state) => state.data?.time)
    const price = useRecipeState((state) => state.data?.price)
    const rating = useRecipeState((state) => state.data?.rating)
    const isLoading = useRecipeState((state) => state.isLoading)
    if (isLoading) {
        return <RecipeHeroSkeleton />
    }
    return (
        <Hero imageClassName="lg:block">
            <Container className="lg:absolute lg:left-0 lg:right-0 grid lg:grid-cols-2 items-center">
                <div>
                    <h1 className="text-4xl font-bold lg:text-white">{name}</h1>
                    {description && <p className="text-lg lg:text-white lg:max-h-[240px] overflow-y-scroll hide-scrollbar">{description}</p>}
                    <div className="flex space-x-2 items-center">
                        <WishRecipe recipeCredentials={recipeCredentials} />
                        {time && <Time time={time} className="lg:text-white" iconClassName="lg:stroke-white" />}
                        {price && <Price price={price} className="lg:text-white" iconClassName="lg:stroke-white" />}
                        {rating && <FiveStars rating={rating} />}
                    </div>
                </div>
                <Image 
                    src={image} 
                    alt={name} 
                    width={600} 
                    height={338} 
                    draggable={false}
                    priority
                    className="hidden lg:block rounded w-[600px] h-[338px] object-cover"
                />
            </Container>
        </Hero>
    )
}
