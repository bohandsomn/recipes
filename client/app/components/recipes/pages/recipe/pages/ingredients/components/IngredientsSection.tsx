'use client'

import React from 'react'
import { useLanguages } from '@/utils/languages/useLanguages'
import { getUniqueList } from '@/components/recipes/utils'
import { useRecipeState } from '../../../context'
import { RecalculationSection } from '../../../components'

export const IngredientsSection = () => {
    const ingredients = useRecipeState((state) => {
        const ingredients = state.data?.ingredients 
        if (!ingredients) {
            return null
        }
        return getUniqueList(ingredients, ({ name }) => name!)
    })
    const translate = useLanguages()
    const header = translate('recipe.ingredients.header')
    if (ingredients?.length === 0) {
        return null
    }
    return (
        <RecalculationSection header={header}>
            <ul className="space-y-2">
                {ingredients?.map(({ name, text, measurements }) => (
                    <li key={name}>
                        <details>
                            <summary className="block w-fit cursor-pointer">
                                <h4 className="text-xl">{name}</h4>
                            </summary>
                            <p>{text}. ({measurements?.join(', ')})</p>
                        </details>
                    </li>
                ))}
            </ul>
        </RecalculationSection>
    )
}
