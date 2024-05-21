import { redirect } from 'next/navigation'
import React from 'react'
import { sortRecipesValues } from '@/components/recipes'
import { getLanguages } from '@/utils/languages/getLanguages'

export const SearchRecipeForm = async () => {
    const translate = await getLanguages()
    const submit = translate('recipes.search.form.submit')
    const sortLabel = translate('recipes.search.form.sort-label')
    const placeholder = translate('recipes.search.form.input-placeholder')
    async function sendHandler(formData: FormData) {
        'use server'
        const query = formData.get('query')?.toString()
        const sort = formData.get('sort')?.toString()
        redirect(`?query=${query}&sort=${sort}`)
    }
    return (
        <form action={sendHandler} className="flex flex-col items-start space-y-2 lg:flex-row lg:justify-between">
            <input name="query" type="text" className="input" placeholder={placeholder} />
            <label className="flex flex-row space-x-2">
                <p>{sortLabel}</p>
                <select name="sort" className="bg-yellow-600 text-white">
                    {sortRecipesValues.map((value) => (
                        <option key={value} value={value}>
                            {translate(`recipes.search.form.sort.${value}`)}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit" className="button">{submit}</button>
        </form>
    )
}
