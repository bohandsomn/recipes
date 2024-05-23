import { FC, PropsWithChildren } from 'react'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { Document, FooterSection, HeaderSection, SectionWrapper, AuthProvider } from '@/components'
import { autoLogInUser, getUserRecipePreview } from '@/actions'
import { AppProvider } from '@/providers'
import { WishProvider } from '@/components/recipes/pages'
import { Locale } from '@/utils/languages'

interface ILocaleProps extends PropsWithChildren {
    params: {
        locale: Locale
    }
}

const LocaleLayout: FC<ILocaleProps> = async ({ 
    params: { locale }, 
    children,
}) => {
    const userPayload = await autoLogInUser()
    const wishList = await getUserRecipePreview()
    const messages = await getMessages({ locale })
    return (
        <Document language={locale}>
            <AppProvider>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AuthProvider state={userPayload}>
                        <HeaderSection />
                        <SectionWrapper>
                            <WishProvider state={wishList}>
                                {children}
                            </WishProvider>
                            <FooterSection />
                        </SectionWrapper>
                    </AuthProvider>
                </NextIntlClientProvider>
            </AppProvider>
        </Document>
    )
}

export default LocaleLayout
