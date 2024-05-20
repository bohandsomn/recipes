import { FC, PropsWithChildren, ReactNode } from 'react'
import { AuthProvider, Document, FooterSection, HeaderSection, SectionWrapper, WishProvider } from '@/components'
import { Locale } from '@/utils'
import { AppProvider } from '@/providers'
import { autoLogInUser, getUserRecipePreview } from '@/actions'

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
    const wishList = await getUserRecipePreview()
    return (
        <Document language={locale}>
            <AppProvider>
                <AuthProvider state={userPayload}>
                    <WishProvider state={wishList}>
                        <HeaderSection />
                        <SectionWrapper>
                            {hero}
                            {recipes}
                            {children}
                            <FooterSection />
                        </SectionWrapper>
                    </WishProvider>
                </AuthProvider>
            </AppProvider>
        </Document>
    )
}

export default LocaleLayout
