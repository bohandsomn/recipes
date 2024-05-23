import React, { FC, ReactNode } from 'react'
import { fontHeader } from '@/fonts'

interface IHeaderProps {
    span: ReactNode
    restHeader: string
    lg?: boolean
}

export const Header: FC<IHeaderProps> = ({
    span,
    restHeader,
    lg = false
}) => {
    return (
        <h1 className={`text-4xl font-bold ${lg ? 'lg:text-white' : 'sm:text-white'}`}>
            <span className={`text-yellow-600 ${fontHeader.className}`}>
                {span}
            </span>{' '}
            {restHeader}
        </h1>
    )
}
