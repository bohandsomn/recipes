import { headers } from 'next/headers'
import Image from 'next/image'
import React from 'react'
import { parseAcceptLanguage } from '@/utils'
import { getLanguages } from '@/utils/languages/server'
import { Container } from '@/components/common'

export const FooterSection = async () => {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages(locale)
    const title = translate('header.logo.title')
    const copyright = translate('footer.copyright')
    return (
        <footer className="py-5">
            <Container className="grid grid-cols-3 grid-flow-row">
                <h3 className="flex flex-row items-center space-x-2 w-fit">
                    <Image 
                        src="/assets/images/logo.webp" 
                        alt="Logo" 
                        width="36"
                        height="36"
                    />
                    {title}
                </h3>
                <p>{copyright}</p>
            </Container>
        </footer>
    )
}
