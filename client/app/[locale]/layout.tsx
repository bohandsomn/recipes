import { FC, PropsWithChildren } from 'react'
import { Document } from '@/components'
import { Locale } from '@/utils'
import { AppProvider } from '@/providers'

interface ILocaleProps extends PropsWithChildren {
    params: {
        locale: Locale
    }
}

const LocaleLayout: FC<ILocaleProps> = ({ params: { locale }, children }) => {
    return (
        <Document language={locale}>
            <AppProvider>
                {children}
            </AppProvider>
        </Document>
    )
}

export default LocaleLayout
