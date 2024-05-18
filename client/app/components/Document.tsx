import React, { FC, PropsWithChildren } from 'react'
import { defaultLocale, Locale } from '@/utils'

interface IDocumentProps extends PropsWithChildren {
    language?: Locale
}

export const Document: FC<IDocumentProps> = ({
    children,
    language = defaultLocale,
}) => {
    return (
        <html lang={language}>
            <body>{children}</body>
        </html>
    )
}
