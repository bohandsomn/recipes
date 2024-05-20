import { Cormorant_Upright, Montserrat } from 'next/font/google'

export const fontHeader = Cormorant_Upright({
    weight: '700',
    variable: '--font-header',
    subsets: ['latin']
})

export const fontCommon = Montserrat({
    weight: ['400', '700'],
    variable: '--font-common',
    subsets: ['latin']
})
