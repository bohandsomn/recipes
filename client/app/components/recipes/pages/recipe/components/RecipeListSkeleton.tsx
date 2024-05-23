import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const RecipeListSkeleton = () => {
    return (
        <Skeleton
            containerClassName="flex w-fit flex-row flex-wrap"
            className="m-[2px] rounded-full px-3 py-2"
            width={150}
            count={20}
        />
    )
}
