'use client'

import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { SEARCH_RECIPE } from '@/graphql'
import { useDebounce } from '@/hooks'
import { IEventTargetValue } from '@/types'
import { useLanguages } from '@/utils/languages/useLanguages'

export const SearchRecipeDatalist = () => {
    const [search, setState] = useState('')
    const debouncedSearch = useDebounce(search)
    const translate = useLanguages()
    const placeholder = translate('recipes.search.form.input-placeholder')
    const changeHandler = (event: IEventTargetValue) => {
        setState(event.target.value)
    }
    const { data } = useQuery<{ searchRecipe: string[] }>(SEARCH_RECIPE, {
        variables: {
            query: debouncedSearch,
        },
        skip: !debouncedSearch,
        fetchPolicy: 'cache-and-network',
    })
    return (
        <>
            <input
                name="query"
                value={search}
                onChange={changeHandler}
                list="search"
                type="text"
                placeholder={placeholder}
            />
            <datalist id="search">
                {data?.searchRecipe.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </datalist>
        </>
    )
}
