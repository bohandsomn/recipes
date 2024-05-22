import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container } from '@/components/common'
import { getLanguages } from '@/utils/languages'
import { HeroSpan } from './HeroSpan'

export const HeroSection = async () => {
    const translate = await getLanguages()
    const header = translate('home.hero.header')
    const button = translate('home.hero.button')
    return (
        <section className="flex items-center">
            <Image 
                src="/assets/images/hero-bg.webp" 
                alt="Hero" 
                width="1920" 
                height="768" 
                draggable={false}
                className="hidden sm:block"
                priority
            />
            <Container className="sm:absolute sm:left-0 sm:right-0">
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
                        <h1 className="text-4xl font-bold sm:text-white">
                            <HeroSpan /> {header}
                        </h1>
                        <Link href="#popular-recipes" className="block w-fit button">
                            {button}
                        </Link>
                    </figcaption>
                </figure>
            </Container>
        </section>
    )
}
