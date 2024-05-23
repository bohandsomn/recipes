import React, { FC } from 'react'

interface IEmptyListProps {
    message: string
    className?: string
}

export const EmptyList: FC<IEmptyListProps> = ({ className = '', message }) => {
    return (
        <div
            className={`${className} border-l-4 border-l-yellow-500 bg-yellow-400 p-5`}
        >
            {message}
        </div>
    )
}
