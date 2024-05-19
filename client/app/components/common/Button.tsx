import React, { ButtonHTMLAttributes, FC } from 'react'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            className={`${className} button`}
            {...props}
        >
            {children}
        </button>
    )
}
