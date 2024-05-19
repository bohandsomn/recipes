import React, { ButtonHTMLAttributes, FC } from 'react'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            className={`${className} bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded`}
            {...props}
        >
            {children}
        </button>
    )
}
