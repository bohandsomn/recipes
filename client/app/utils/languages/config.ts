import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './constants'

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) {
        notFound()
    }
    return {
        messages: (await import(`./constants/i18n/${locale}.json`)).default
    }
})
