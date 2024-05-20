import React, { FC } from 'react'
import { IRecipeListPreview } from '../types'
import { IClientResponse } from '@/types'
import { RecipePreview } from './RecipePreview'
import { RecipeSkeletonList } from './RecipeSkeletonList'

type IRecipePreviewListProps = IClientResponse<IRecipeListPreview>

export const RecipePreviewList: FC<IRecipePreviewListProps> = ({
    data,
    error,
    isLoading,
}) => {
    if (isLoading) {
        return <RecipeSkeletonList />
    }
    // TODO: Add error boundary and empty list
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
