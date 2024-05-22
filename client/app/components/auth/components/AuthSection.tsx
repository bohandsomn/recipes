import React, { FC, PropsWithChildren } from 'react'
import { Container, Header, Hero } from '@/components/common'
import { getLanguages } from '@/utils/languages'

export const AuthSection: FC<PropsWithChildren> = async ({
    children,
}) => {
    const translate = await getLanguages()
    const span = translate('home.hero.cook')
    const restHeader = translate('home.hero.header')
    return (
        <Hero imageClassName="sm:block">
            <Container className="sm:grid sm:grid-cols-2 sm:items-center sm:space-y-0 space-y-2">
                <Header span={span} restHeader={restHeader} />
                {children}
            </Container>
        </Hero>
    )
}
