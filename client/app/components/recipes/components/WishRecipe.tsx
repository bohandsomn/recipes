'use client'

import React, { FC, useState } from 'react'
import { WishIcon } from '@/components/common'
import { useToggleRecipeMutation } from '@/graphql'
import { useWishState } from '../pages'

interface IWishRecipeProps {
    recipeCredentials: string
}

export const WishRecipe: FC<IWishRecipeProps> = ({
    recipeCredentials
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const isWished = useWishState((state) => {
        const isWished = !!state.data?.data.find((recipe) => recipe.recipeCredentials === recipeCredentials)
        return isWished
    })
    const toggleWish = useToggleRecipeMutation(isWished)
    const clickHandler = async () => {
        try {
            setIsLoading(true)
            await toggleWish({
                recipeCredentials,
            })
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <button onClick={clickHandler}>
            <WishIcon 
                width={24} 
                hanging={24} 
                fill={isLoading ? '#E2E2E2' : isWished ? '#BF1A1E' : '#fff'} 
                stroke={isLoading ? '#E2E2E2' : isWished ? '#BF1A1E' : '#000'}
                className="cursor-pointer" 
            />
        </button>
    )
}
