'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useLanguages } from '@/utils/languages/useLanguages'

export const HeroSpan = () => {
    const translate = useLanguages()
    const search = translate('home.hero.search')
    const wish = translate('home.hero.wish')
    const cook = translate('home.hero.cook')
    const spans = useMemo(() => [search, wish, cook], [search, wish, cook])
    const [span, setSpan] = useState(spans[0])
    useEffect(() => {
        const intervalId = setInterval(() => {
            const index = spans.findIndex((current) => current === span)
            if (index >= spans.length - 1) {
                setSpan(spans[0])
            } else {
                setSpan(spans[index + 1])
            }
        }, 1800)
        return () => {
            clearInterval(intervalId)
        }
    }, [spans, span, setSpan])
    return <>{span}</>
}
