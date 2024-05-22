import Image from 'next/image'
import React, { FC, PropsWithChildren } from 'react'
import { Container } from '@/components/common'
import { getLanguages } from '@/utils/languages'
import { fontHeader } from '@/fonts'

export const AuthSection: FC<PropsWithChildren> = async ({
    children,
}) => {
    const translate = await getLanguages()
    const span = translate('home.hero.cook')
    const restHeader = translate('home.hero.header')
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
            <Container className="sm:absolute sm:grid sm:grid-cols-2 sm:left-0 sm:right-0 sm:items-center sm:space-y-0 space-y-2">
                <h1 className="text-4xl font-bold sm:text-white">
                    <span className={`text-yellow-600 ${fontHeader.className}`}>
                        {span}
                    </span>{' '}
                    {restHeader}
                </h1>
                {children}
            </Container>
        </section>
    )
}
