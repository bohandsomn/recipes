'use client'

import React from 'react'
import { Nutrition } from './Nutrition'
import { RecipeVideo } from './RecipeVideo'
import { RecipeTags } from '../../../components'
import { useLanguages } from '@/utils/languages/useLanguages'

export const VideoSection = () => {
    const translate = useLanguages()
    const header = translate('recipe.video.header')
    return (
        <section>
            <h3 className="text-2xl">{header}</h3>
            <Nutrition />
            <RecipeVideo />
            <RecipeTags />
        </section>
    )
}
