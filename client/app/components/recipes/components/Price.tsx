import React, { FC } from 'react'
import { PriceIcon } from '@/components/common'

interface IPriceProps {
    price: number
    className?: string
    iconClassName?: string
}

export const Price: FC<IPriceProps> = ({
    price,
    className = '',
    iconClassName = '',
}) => {
    return (
        <p
            title={price.toString()}
            className={`${className} flex flex-row items-center space-x-1`}
        >
            <PriceIcon width={16} height={16} className={iconClassName} />
            <span>{price}</span>
        </p>
    )
}
