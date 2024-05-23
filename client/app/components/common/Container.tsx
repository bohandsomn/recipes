import React, { FC, HTMLAttributes } from 'react'

interface IContainerProps extends HTMLAttributes<HTMLElement> {}

export const Container: FC<IContainerProps> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <section
            className={`${className} mx-auto my-0 w-[360px] sm:w-[576px] md:w-[768px] lg:w-[992px] xl:w-[1200px]`}
            {...props}
        >
            {children}
        </section>
    )
}
