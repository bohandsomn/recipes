import React, { FC, PropsWithChildren } from 'react'
import { defaultLocale, Locale } from '@/utils/languages/constants'
import { fontHeader, fontCommon } from '@/fonts'

interface IDocumentProps extends PropsWithChildren {
    language?: Locale
}

export const Document: FC<IDocumentProps> = ({
    children,
    language = defaultLocale,
}) => {
    return (
        <html 
            lang={language} 
            className={`${fontHeader.variable} ${fontCommon.variable}`}
        >
            <body>{children}</body>
        </html>
    )
}
