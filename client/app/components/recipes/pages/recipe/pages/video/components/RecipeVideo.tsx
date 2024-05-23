'use client'

import React from 'react'
import { useRecipeState } from '../../../context'
import { RecipeVideoSkeleton } from './RecipeVideoSkeleton'

export const RecipeVideo = () => {
    const isLoading = useRecipeState((state) => state.isLoading)
    const posterSrc = useRecipeState((state) => state.data?.image!)
    const videoSrc = useRecipeState((state) => state.data?.video!)
    const extension = useRecipeState(
        (state) => state.data?.video?.split('.').at(-1) ?? 'mp4',
    )
    if (isLoading) {
        return <RecipeVideoSkeleton />
    }
    return (
        <video
            width={600}
            height={338}
            controls
            poster={posterSrc}
            className="video-js"
        >
            <source src={videoSrc!} type={`video/${extension}`} />
        </video>
    )
}
