import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

interface IRecalculationListSkeletonProps {
    width?: number
    height?: number
}

export const RecalculationListSkeleton: FC<IRecalculationListSkeletonProps> = ({
    width = 150,
    height = 28,
}) => {
    return (
        <Skeleton containerClassName="space-y-2" width={width} height={height} count={10} />
    )
}
