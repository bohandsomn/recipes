import { Page } from '@/constants'
import Link from 'next/link'
import React, { FC } from 'react'

interface IRecipeListProps {
    list: string[]
    tag?: boolean
}

export const RecipeList: FC<IRecipeListProps> = ({
    list,
    tag = false
}) => {
    return (
        <ul className="flex w-fit flex-row flex-wrap">
            {list.map((item, index) => (
                <li key={index} className="px-3 py-2 rounded-full bg-white m-1">
                    <Link href={`/${Page.RECIPES}?query=${item}`}>{tag ? '#' : ''}{item}</Link>
                </li>
            ))}
        </ul>
    )
}
