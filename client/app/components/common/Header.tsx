import { fontHeader } from '@/fonts'
import React, { FC, ReactNode } from 'react'

interface IHeaderProps {
    span: ReactNode
    restHeader: string
}

export const Header: FC<IHeaderProps> = ({
    span,
    restHeader,
}) => {
    return (
        <h1 className="text-4xl font-bold sm:text-white">
            <span className={`text-yellow-600 ${fontHeader.className}`}>
                {span}
            </span>{' '}
            {restHeader}
        </h1>
    )
}
