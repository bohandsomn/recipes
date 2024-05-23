import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const NutritionSkeleton = () => {
    return (
        <Skeleton 
            containerClassName="flex flex-wrap" 
            className="m-1"
            width={150} 
            height={24} 
            count={6} 
        />
    )
}
