import { FC, PropsWithChildren, ReactNode } from 'react'
import { Document } from '@/components'
import { Locale } from '@/utils'
import { AppProvider } from '@/providers'

interface ILocaleProps extends PropsWithChildren {
    params: {
        locale: Locale
    }
    hero: ReactNode
}

const LocaleLayout: FC<ILocaleProps> = ({ params: { locale }, hero, children }) => {
    return (
        <Document language={locale}>
            <AppProvider>
                {hero}
                {children}
            </AppProvider>
        </Document>
    )
}

export default LocaleLayout
