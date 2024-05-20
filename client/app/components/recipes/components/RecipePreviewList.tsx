import React, { FC } from 'react'
import { EmptyList, ErrorBoundary } from '@/components/common'
import { IClientResponse } from '@/types'
import { IRecipeListPreview } from '../types'
import { RecipePreview } from './RecipePreview'
import { RecipeSkeletonList } from './RecipeSkeletonList'

type IRecipePreviewListProps = IClientResponse<IRecipeListPreview> & {
    emptyErrorMessage: string
}

export const RecipePreviewList: FC<IRecipePreviewListProps> = ({
    data,
    error,
    isLoading,
    emptyErrorMessage,
}) => {
    if (isLoading) {
        return <RecipeSkeletonList />
    }
    if (error) {
        return <ErrorBoundary errorMessage={error} />
    }
    if (data?.data.length === 0) {
        return <EmptyList message={emptyErrorMessage} />
    }
    return (
        <ul className="flex flex-wrap justify-center">
            {data?.data.map((recipe) => (
                <li key={recipe.recipeCredentials} className="flex m-2">
                    <RecipePreview {...recipe} />
                </li>
            ))}
        </ul>
    )
}
