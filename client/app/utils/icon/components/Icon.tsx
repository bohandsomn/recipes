import React, { FC } from 'react'

export interface IIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'd'> {
    d: string[]
}

export const Icon: FC<IIconProps> = ({ d, ...props }) => {
    return (
        <svg {...props}>
            {d.map((d, index) => (
                <path key={index} d={d} />
            ))}
        </svg>
    )
}
