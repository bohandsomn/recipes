import { redirect } from 'next/navigation'
import React from 'react'
import { sortRecipesValues } from '@/components/recipes'
import { getLanguages } from '@/utils/languages'
import { SearchRecipeDatalist } from './SearchRecipeDatalist'

export const SearchRecipeForm = async () => {
    const translate = await getLanguages()
    const submit = translate('recipes.search.form.submit')
    const sortLabel = translate('recipes.search.form.sort-label')
    async function sendHandler(formData: FormData) {
        'use server'
        const query = formData.get('query')?.toString()
        const sort = formData.get('sort')?.toString()
        redirect(`?query=${query}&sort=${sort}`)
    }
    return (
        <form action={sendHandler} className="flex flex-col items-start space-y-2">
            <div className="flex flex-row space-x-1">
                <SearchRecipeDatalist />
                <button type="submit" className="button">{submit}</button>
            </div>
            <label className="flex flex-row space-x-2">
                <p>{sortLabel}</p>
                <select name="sort" className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded">
                    {sortRecipesValues.map((value) => (
                        <option key={value} value={value}>
                            {translate(`recipes.search.form.sort.${value}`)}
                        </option>
                    ))}
                </select>
            </label>
        </form>
    )
}
