import Image from 'next/image'
import { headers } from 'next/headers'
import React from 'react'
import { Button, Container } from '@/components/common'
import { getLanguages } from '@/utils/languages/server'
import { parseAcceptLanguage } from '@/utils'
import { HeroSpan } from './HeroSpan'

export const HeroSection = async () => {
    const acceptLanguage = headers().get('Accept-Language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages(locale)
    const header = translate('home.hero.header')
    const button = translate('home.hero.button')
    return (
        <section className="flex items-center">
            <Image 
                src="/assets/images/hero-bg.webp" 
                alt="Hero" 
                width="1920" 
                height="1080" 
                draggable={false}
            />
            <Container className="absolute left-0 right-0">
                <figure className="flex items-center flex-row-reverse">
                    <Image
                        src="/assets/images/hero.webp"
                        alt="Hero"
                        width="600"
                        height="293"
                        draggable={false}
                        className="hidden lg:block"
                    />
                    <figcaption className="space-y-4 flex-1 lg:flex-0">
                        <h1 className="text-4xl font-bold text-white">
                            <HeroSpan /> {header}
                        </h1>
                        {/** TODO: Add link to anchor */}
                        <Button>
                            {button}
                        </Button>
                    </figcaption>
                </figure>
            </Container>
        </section>
    )
}
