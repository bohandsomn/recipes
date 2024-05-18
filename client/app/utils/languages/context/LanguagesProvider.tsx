'use client'

import { useParams } from 'next/navigation'
import React, { FC, PropsWithChildren } from 'react'
import { I18nProviderClient } from '../client'
import { Locale } from '../constants'

export const LanguagesProvider: FC<PropsWithChildren> = ({ children }) => {
    const { locale } = useParams()
    return (
        <I18nProviderClient locale={locale as Locale}>
            {children}
        </I18nProviderClient>
    )
}
