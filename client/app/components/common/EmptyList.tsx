import React, { FC } from 'react'

interface IEmptyListProps {
    message: string
    className?: string
}

export const EmptyList: FC<IEmptyListProps> = ({ className, message }) => {
    return <div className={className}>{message}</div>
}
