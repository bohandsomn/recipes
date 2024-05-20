import React, { FC } from 'react'
import { ClockIcon } from '@/components/common'

interface ITimeProps {
    time: number
}

export const Time: FC<ITimeProps> = ({
    time,
}) => {
    const displayTime = `${time} m`
    return (
        <p title={displayTime} className="flex flex-row space-x-1 items-center">
            <ClockIcon width={16} height={16} />
            <span>{displayTime}</span>
        </p>
    )
}
