import { fontHeader } from '@/fonts'
import React, { FC, ReactNode } from 'react'

interface IHeaderProps {
    span: ReactNode
    restHeader: string
    auth?: boolean
}

export const Header: FC<IHeaderProps> = ({
    span,
    restHeader,
    auth = false
}) => {
    return (
        <h1 className={`text-4xl font-bold ${auth ? 'lg:text-white' : 'sm:text-white'}`}>
            <span className={`text-yellow-600 ${fontHeader.className}`}>
                {span}
            </span>{' '}
            {restHeader}
        </h1>
    )
}
