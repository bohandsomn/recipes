import React, { FC } from 'react'
import { WishIcon } from '@/components/common'
import { useWishState } from '../pages'

interface IWishRecipeProps {
    recipeCredentials: string
}

export const WishRecipe: FC<IWishRecipeProps> = ({
    recipeCredentials
}) => {
    // TODO: Add toggle wish list mutations
    const isWished = useWishState((state) => {
        const isWished = !!state.data?.data.find((recipe) => recipe.recipeCredentials === recipeCredentials)
        return isWished
    })
    return (
        <WishIcon 
            width={24} 
            hanging={24} 
            fill={isWished ? '#BF1A1E' : '#fff'} 
            stroke={isWished ? '#BF1A1E' : '#000'}
            className="cursor-pointer" 
        />
    )
}
