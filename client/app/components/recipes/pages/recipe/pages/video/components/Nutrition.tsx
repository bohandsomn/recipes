'use client'

import React from 'react'
import { useLanguages } from '@/utils/languages/useLanguages'
import { useRecipeState } from '../../../context'

export const Nutrition = () => {
    const translate = useLanguages()
    const calories = useRecipeState((state) => state.data?.calories)
    const carbohydrate = useRecipeState((state) => state.data?.carbohydrate)
    const fat = useRecipeState((state) => state.data?.fat)
    const fiber = useRecipeState((state) => state.data?.fiber)
    const protein = useRecipeState((state) => state.data?.protein)
    const sugar = useRecipeState((state) => state.data?.sugar)
    const caloriesTitle = translate('recipe.video.calories')
    const carbohydrateTitle = translate('recipe.video.carbohydrate')
    const fatTitle = translate('recipe.video.fat')
    const fiberTitle = translate('recipe.video.fiber')
    const proteinTitle = translate('recipe.video.protein')
    const sugarTitle = translate('recipe.video.sugar')
    const nutrition = [
        {value: calories, title: caloriesTitle}, 
        {value: carbohydrate, title: carbohydrateTitle}, 
        {value: fat, title: fatTitle}, 
        {value: fiber, title: fiberTitle}, 
        {value: protein, title: proteinTitle}, 
        {value: sugar, title: sugarTitle}
    ].filter(({ value }) => !!value)
    if (!nutrition.length) {
        return null
    }
    return (
        <ul className="flex flex-wrap">
            {nutrition.map(({value, title}) => (
                <li key={`${value} - ${title}`} className="flex m-1">
                    <strong>
                        {value}
                    </strong>{'-'}
                    <p>
                        {title}
                    </p>
                </li>
            ))}
        </ul>
    )
}
