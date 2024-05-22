'use client'

import React from 'react'
import { useRecipeState } from '../../../context'
import { useLanguages } from '@/utils/languages/useLanguages'
import { Time } from '@/components/recipes/components'

export const StagesSection = () => {
    const stages = useRecipeState((state) => state.data?.stages)
    const translate = useLanguages()
    const header = translate('recipe.stages.header')
    return (
        <section>
            <h2 className="text-3xl">{header}</h2>
            <ul className="space-y-2">
                {stages?.map(({ id, name, time }) => (
                    <li key={id}>
                        <p>{name}</p>
                        {time && <Time time={Math.round(time)} />}
                    </li>
                ))}
            </ul>
        </section>
    )
}
