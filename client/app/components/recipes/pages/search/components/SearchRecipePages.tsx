'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/components/recipes/constants'
import { useRecipesState } from '@/context/preview'

export const SearchRecipePages = () => {
    const currentPage = useSearchParams().get('page')
    const pages = useRecipesState((state): number[] => {
        const page = parseInt(currentPage || DEFAULT_PAGE.toString())
        const maxPages = 7
        const side = Math.ceil(maxPages / 2)
        const firstPage = Math.max(page - side, 0)
        const lastPage = firstPage + maxPages
        const count = state.data?.count ?? lastPage * DEFAULT_SIZE
        const countPages = count / DEFAULT_SIZE
        const first = firstPage
        const last = Math.min(countPages, lastPage)
        const pages: number[] = []
        for (let index = first; index < last; index++) {
            pages.push(index)
        }
        return pages
    })
    const query = useSearchParams().get('query') || ''
    const sort = useSearchParams().get('sort') || ''
    return (
        <ul className="flex w-[100%] justify-between">
            {pages.map((index) => (
                <li
                    key={index}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
                >
                    <Link
                        href={`?query=${query}&sort=${sort}&page=${index + 1}`}
                    >
                        {index + 1}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
