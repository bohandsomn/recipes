import React, { FC, PropsWithChildren } from 'react'
import { Container, Header, Hero } from '@/components/common'
import { getLanguages } from '@/utils/languages'

export const AuthSection: FC<PropsWithChildren> = async ({ children }) => {
    const translate = await getLanguages()
    const span = translate('home.hero.cook')
    const restHeader = translate('home.hero.header')
    return (
        <Hero lg>
            <Container className="space-y-2 lg:absolute lg:left-0 lg:right-0 lg:grid lg:grid-cols-2 lg:items-center lg:space-y-0">
                <Header span={span} restHeader={restHeader} lg />
                {children}
            </Container>
        </Hero>
    )
}
