'use client'

import React from 'react'
import { useLanguages } from '@/utils/languages/useLanguages'
import { Time } from '@/components/recipes/components'
import { getUniqueList } from '@/components/recipes/utils'
import { useRecipeState } from '../../../context'
import { RecalculationSection } from '../../../components'

export const StagesSection = () => {
    const stages = useRecipeState((state) => {
        const stages = state.data?.stages 
        if (!stages) {
            return null
        }
        return getUniqueList(stages, ({ name }) => name!)
    })
    const translate = useLanguages()
    const header = translate('recipe.stages.header')
    if (stages?.length === 0) {
        return null
    }
    return (
        <RecalculationSection header={header} width={496} height={72}>
            <ul className="space-y-2">
                {stages?.map(({ id, name, time }) => (
                    <li key={id}>
                        <p>{name}</p>
                        {time && <Time time={time / 1000} />}
                    </li>
                ))}
            </ul>
        </RecalculationSection>
    )
}
