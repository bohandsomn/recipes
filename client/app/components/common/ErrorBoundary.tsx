'use client'

import React, { FC, ReactElement, useEffect } from 'react'
import { useNotification } from '@/utils'
import { LinkIcon } from './icons'

interface IErrorBoundaryProps {
    errorMessage: string
    notNotify?: boolean
    onClick?(): void
    rightElement?: ReactElement
    className?: string
}

export const ErrorBoundary: FC<IErrorBoundaryProps> = ({
    errorMessage,
    onClick,
    rightElement,
    notNotify = false,
    className = '',
}) => {
    const notify = useNotification()
    useEffect(() => {
        if (notNotify) {
            return
        }
        notify.error(errorMessage)
    }, [errorMessage, notNotify])
    return (
        <div
            className={`${className} ${rightElement ? 'border-l-yellow-800 bg-yellow-600' : 'border-l-red-700 bg-red-500'} flex items-center space-x-5 border-l-4 p-5`}
        >
            {onClick && <LinkIcon />}
            <div className="flex flex-1 justify-between">
                <p
                    onClick={onClick}
                    className={`${onClick ? 'cursor-pointer underline' : ''}`}
                >
                    {errorMessage}
                </p>
                {rightElement}
            </div>
        </div>
    )
}
