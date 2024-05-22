import Image from 'next/image'
import React, { FC, PropsWithChildren } from 'react'

interface IHerpProps extends PropsWithChildren {
    imageClassName?: string
}

export const Hero: FC<IHerpProps> = ({ 
    children,
    imageClassName = '',
}) => {
    return (
        <section className="flex items-center">
            <Image 
                src="/assets/images/hero-bg.webp" 
                alt="Hero" 
                width="1920" 
                height="768" 
                draggable={false}
                className={`hidden ${imageClassName}`}
                priority
            />
            {children}
        </section>
    )
}
