import Image from 'next/image'
import React, { FC, PropsWithChildren } from 'react'

interface IHerpProps extends PropsWithChildren {
    lg?: boolean
}

export const Hero: FC<IHerpProps> = ({ 
    children,
    lg = false,
}) => {
    return (
        <section className="flex items-center">
            <Image 
                src="/assets/images/hero-bg.webp" 
                alt="Hero" 
                width="1920" 
                height="768" 
                draggable={false}
                className={`hidden ${lg ? 'lg:block' : 'sm:block'}`}
                priority
            />
            {children}
        </section>
    )
}
