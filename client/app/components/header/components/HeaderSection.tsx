import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import React from 'react'
import { Page } from '@/constants'
import { Container } from '@/components/common'
import { parseAcceptLanguage } from '@/utils'
import { getLanguages } from '@/utils/languages/server'
import { HeaderLinks } from './HeaderLinks'

export const HeaderSection = async () => {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages(locale)
    const title = translate('header.logo.title')
    return (
        <header className="sticky top-0 z-50 bg-[#FCD9C5]">
            <Container className="py-5 flex flex-row justify-between">
                <Link href={`${locale}${Page.HOME}`} className="flex flex-row items-center space-x-2 w-fit">
                    <Image 
                        src="/assets/images/logo.webp" 
                        alt="Logo" 
                        width="36"
                        height="36"
                    />
                    {title}
                </Link>
                <HeaderLinks />
            </Container>
        </header>
    )
}
