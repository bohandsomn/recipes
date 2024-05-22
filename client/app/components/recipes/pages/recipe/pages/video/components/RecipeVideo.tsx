'use client'

import React from 'react'
import { useRecipeState } from '../../../context'

export const RecipeVideo = () => {
    const image = useRecipeState((state) => state.data?.image!)
    const video = useRecipeState((state) => state.data?.video!)
    const extension = useRecipeState((state) => state.data?.video?.split('.').at(-1) ?? 'mp4')
    return (
        <video width={600} height={338} controls poster={image}>
            <source src={video!} type={`video/${extension}`} />
        </video>
    )
}
