import Image from 'next/image'
import React from 'react'
import { getLanguages } from '@/utils/languages'
import { Container } from '@/components/common'

export const FooterSection = async () => {
    const translate = await getLanguages()
    const title = translate('header.logo.title')
    const copyright = translate('footer.copyright')
    return (
        <footer className="py-5">
            <Container className="grid grid-cols-[1fr_2fr]">
                <p className="flex flex-row items-center space-x-2 w-fit">
                    <Image 
                        src="/assets/images/logo.webp" 
                        alt="Logo" 
                        width="36"
                        height="36"
                    />
                    {title}
                </p>
                <p>{copyright}</p>
            </Container>
        </footer>
    )
}
