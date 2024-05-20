import { FC, PropsWithChildren, ReactNode } from 'react'
import { AuthProvider, Document, FooterSection, HeaderSection, SectionWrapper } from '@/components'
import { Locale } from '@/utils'
import { AppProvider } from '@/providers'
import { autoLogInUser } from '@/actions'

interface ILocaleProps extends PropsWithChildren {
    params: {
        locale: Locale
    }
    hero: ReactNode
    recipes: ReactNode
}

const LocaleLayout: FC<ILocaleProps> = async ({ 
    params: { locale }, 
    hero, 
    recipes, 
    children 
}) => {
    const userPayload = await autoLogInUser()
    return (
        <Document language={locale}>
            <AppProvider>
                <AuthProvider state={userPayload}>
                    <HeaderSection />
                    <SectionWrapper>
                        {hero}
                        {recipes}
                        {children}
                        <FooterSection />
                    </SectionWrapper>
                </AuthProvider>
            </AppProvider>
        </Document>
    )
}

export default LocaleLayout
