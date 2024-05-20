import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { DEFAULT_SIZE } from '../constants'

export const RecipeSkeletonList = () => {
    return (
        <div className="flex flex-wrap justify-center">
            {Array.from({length: DEFAULT_SIZE}). map((_, index) => (
                <div key={index} className="flex flex-col m-2">
                    <Skeleton width={280} height={180} />
                    <Skeleton width={230} height={24} />
                    <Skeleton width={260} height={80} />
                </div>
            ))}
        </div>
    )
}
