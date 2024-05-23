'use client'

import React, { FC, useEffect } from 'react'
import { useNotification } from '@/utils/notification'

interface IErrorBoundaryProps {
    errorMessage: string
    notNotify?: boolean
    className?: string
}

export const ErrorBoundary: FC<IErrorBoundaryProps> = ({
    errorMessage,
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
        <div className={`${className} border-l-red-500 bg-red-400 border-l-4 p-5 text-white`}>
            {errorMessage}
        </div>
    )
}
