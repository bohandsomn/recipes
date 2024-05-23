import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container } from '@/components/common'
import { getLanguages } from '@/utils/languages'
import { HeaderLinks } from './HeaderLinks'

export const HeaderSection = async () => {
    const translate = await getLanguages()
    const title = translate('header.logo.title')
    return (
        <header className="sticky top-0 z-50 bg-[#FCD9C5]">
            <Container className="flex flex-row justify-between py-5">
                <Link
                    href="/"
                    className="flex w-fit flex-row items-center space-x-2"
                >
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
