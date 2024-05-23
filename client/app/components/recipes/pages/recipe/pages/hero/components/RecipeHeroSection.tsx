'use client'

import Image from 'next/image'
import React from 'react'
import { Container, Hero } from '@/components/common'
import {
    FiveStars,
    Price,
    Time,
    WishRecipe,
} from '@/components/recipes/components'
import { useRecipeState } from '../../../context'
import { RecipeHeroSkeleton } from './RecipeHeroSkeleton'

export const RecipeHeroSection = () => {
    const name = useRecipeState((state) => state.data?.name!)
    const image = useRecipeState((state) => state.data?.image!)
    const recipeCredentials = useRecipeState(
        (state) => state.data?.recipeCredentials!,
    )
    const description = useRecipeState((state) => state.data?.description)
    const time = useRecipeState((state) => state.data?.time)
    const price = useRecipeState((state) => state.data?.price)
    const rating = useRecipeState((state) => state.data?.rating)
    const isLoading = useRecipeState((state) => state.isLoading)
    if (isLoading) {
        return <RecipeHeroSkeleton />
    }
    return (
        <Hero lg>
            <Container className="grid items-center lg:absolute lg:left-0 lg:right-0 lg:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold lg:text-white">{name}</h1>
                    {description && (
                        <p className="hide-scrollbar overflow-y-scroll text-lg lg:max-h-[240px] lg:text-white">
                            {description}
                        </p>
                    )}
                    <div className="flex items-center space-x-2">
                        <WishRecipe recipeCredentials={recipeCredentials} />
                        {time && (
                            <Time
                                time={time}
                                className="lg:text-white"
                                iconClassName="lg:stroke-white"
                            />
                        )}
                        {price && (
                            <Price
                                price={price}
                                className="lg:text-white"
                                iconClassName="lg:stroke-white"
                            />
                        )}
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
                    className="hidden h-[338px] w-[600px] rounded object-cover lg:block"
                />
            </Container>
        </Hero>
    )
}
