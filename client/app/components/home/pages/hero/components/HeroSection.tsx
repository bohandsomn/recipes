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
        <Hero imageClassName="sm:block">
            <Container>
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
                        <Header span={<HeroSpan />} restHeader={restHeader} />
                        <Link href="#popular-recipes" className="block w-fit button">
                            {button}
                        </Link>
                    </figcaption>
                </figure>
            </Container>
        </Hero>
    )
}
