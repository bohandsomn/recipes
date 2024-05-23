import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const RecipeListSkeleton = () => {
    return (
        <Skeleton 
            containerClassName="flex w-fit flex-row flex-wrap" 
            className="px-3 py-2 rounded-full m-[2px]" 
            width={150}
            count={20}
        />
    )
}
