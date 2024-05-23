import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container, Header, Hero } from '@/components/common'
import { getLanguages } from '@/utils/languages'
import { HeroSpan } from './HeroSpan'

export const HeroSection = async () => {
    const translate = await getLanguages()
    const restHeader = translate('home.hero.header')
    const button = translate('home.hero.button')
    return (
        <Hero>
            <Container className="sm:absolute sm:left-0 sm:right-0">
                <figure className="flex flex-row-reverse items-center">
                    <Image
                        src="/assets/images/hero.webp"
                        alt="Hero"
                        width="600"
                        height="293"
                        draggable={false}
                        className="hidden lg:block"
                    />
                    <figcaption className="lg:flex-0 flex-1 space-y-4">
                        <Header span={<HeroSpan />} restHeader={restHeader} />
                        <Link
                            href="#popular-recipes"
                            className="button block w-fit"
                        >
                            {button}
                        </Link>
                    </figcaption>
                </figure>
            </Container>
        </Hero>
    )
}
