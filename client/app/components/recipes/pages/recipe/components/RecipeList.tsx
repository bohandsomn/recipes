import { Page } from '@/constants'
import Link from 'next/link'
import React, { FC } from 'react'
import { RecipeListSkeleton } from './RecipeListSkeleton'

interface IRecipeListProps {
    list: string[]
    tag?: boolean
}

export const RecipeList: FC<IRecipeListProps> = ({
    list,
    tag = false
}) => {
    if (!list.length) {
        return <RecipeListSkeleton />
    }
    return (
        <ul className="flex w-fit flex-row flex-wrap">
            {list.map((item, index) => (
                <li key={index} className="px-3 py-2 rounded-full bg-white m-[2px]">
                    <Link href={`/${Page.RECIPES}?query=${item}`}>{tag ? '#' : ''}{item}</Link>
                </li>
            ))}
        </ul>
    )
}
