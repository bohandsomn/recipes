import Link from 'next/link'
import React, { FC } from 'react'
import { Page } from '@/constants'
import { RecipeListSkeleton } from './RecipeListSkeleton'

interface IRecipeListProps {
    list: string[]
    tag?: boolean
}

export const RecipeList: FC<IRecipeListProps> = ({ list, tag = false }) => {
    if (!list.length) {
        return <RecipeListSkeleton />
    }
    return (
        <ul className="flex w-fit flex-row flex-wrap">
            {list.map((item, index) => (
                <li
                    key={index}
                    className="m-[2px] rounded-full bg-white px-3 py-2"
                >
                    <Link href={`/${Page.RECIPES}?query=${item}`}>
                        {tag ? '#' : ''}
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
