import React, { FC } from 'react'
import { StarIcon } from '@/components/common'

interface IFiveStarsProps {
    /**
     * From 0 to 1
     */
    rating: number
}

const NUMBER_SYSTEM = 5

export const FiveStars: FC<IFiveStarsProps> = ({
    rating,
}) => {
    const fifthRating = rating * NUMBER_SYSTEM
    const nearestIntegerRating = Math.round(fifthRating)
    const percentage = Math.round(rating * 100)
    const title = `${percentage}%`
    return (
        <ul className="flex flex-row space-x-1" title={title}>
            {Array.from({ length: NUMBER_SYSTEM }).map((_, index) => (
                <li key={index}>
                    <StarIcon 
                        fill={index < nearestIntegerRating ? '#CA8A04' : '#fff'} 
                        stroke={index < nearestIntegerRating ? '#CA8A04' : '#000'} 
                        width={16} 
                        height={16} 
                    />
                </li>
            ))}
        </ul>
    )
}
