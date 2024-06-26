import React, { FC } from 'react'
import { ClockIcon } from '@/components/common'

interface ITimeProps {
    time: number
    className?: string
    iconClassName?: string
}

export const Time: FC<ITimeProps> = ({
    time,
    className = '',
    iconClassName = '',
}) => {
    time = Math.round(time)
    const displayTime = `${time} m`
    return (
        <p
            title={displayTime}
            className={`${className} flex flex-row items-center space-x-1 text-inherit`}
        >
            <ClockIcon width={16} height={16} className={iconClassName} />
            <span>{displayTime}</span>
        </p>
    )
}
