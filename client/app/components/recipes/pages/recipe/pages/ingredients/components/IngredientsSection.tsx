'use client'

import React from 'react'
import { useRecipeState } from '../../../context'
import { useLanguages } from '@/utils/languages/useLanguages'

export const IngredientsSection = () => {
    const ingredients = useRecipeState((state) => state.data?.ingredients)
    const translate = useLanguages()
    const header = translate('recipe.ingredients.header')
    return (
        <section>
            <h2 className="text-3xl">{header}</h2>
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
        </section>
    )
}
