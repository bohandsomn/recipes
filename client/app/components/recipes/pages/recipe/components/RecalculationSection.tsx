'use client'

import React, { FC, PropsWithChildren } from 'react'
import { useRecipeState } from '../context'
import { RecalculationListSkeleton } from './RecalculationListSkeleton'

interface IRecalculationSectionProps extends PropsWithChildren {
    header: string
    width?: number
    height?: number
}

export const RecalculationSection: FC<IRecalculationSectionProps> = ({
    header,
    width,
    height,
    children,
}) => {
    const isLoading = useRecipeState((state) => state.isLoading)
    return (
        <section>
            <h2 className="text-3xl">{header}</h2>
            {isLoading ? (
                <RecalculationListSkeleton width={width} height={height} />
            ) : (
                children
            )}
        </section>
    )
}
