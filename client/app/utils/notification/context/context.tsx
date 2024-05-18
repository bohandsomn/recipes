'use client'

import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { createContext } from '@/utils'
import { HotToastNotificationService } from '../services'
import { INotificationContext } from './types'

const service = new HotToastNotificationService()

export const [Provider, useNotification] = createContext<INotificationContext>(
    service as INotificationContext,
    {
        name: 'NotificationContext',
    },
)

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider>
            {children}
            <Toaster position="bottom-right" />
        </Provider>
    )
}
