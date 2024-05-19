import { FC, PropsWithChildren, ReactNode } from 'react'
import { Document, SectionWrapper } from '@/components'
import { Locale } from '@/utils'
import { AppProvider } from '@/providers'

interface ILocaleProps extends PropsWithChildren {
    params: {
        locale: Locale
    }
    hero: ReactNode
    recipes: ReactNode
}

const LocaleLayout: FC<ILocaleProps> = ({ 
    params: { locale }, 
    hero, 
    recipes, 
    children 
}) => {
    return (
        <Document language={locale}>
            <AppProvider>
                <SectionWrapper>
                    {hero}
                    {recipes}
                    {children}
                </SectionWrapper>
            </AppProvider>
        </Document>
    )
}

export default LocaleLayout
