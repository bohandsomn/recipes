import { defaultLocale, Locale, locales } from './constants'

export function parseAcceptLanguage(acceptLanguage: string | null): Locale {
    if (!acceptLanguage) {
        return defaultLocale
    }
    const [first] = acceptLanguage.split(';')
    if (!first) {
        return defaultLocale
    }
    const [language] = first.split('-')
    if (!locales.includes(language as Locale)) {
        return defaultLocale
    }
    return language as Locale
}
