import { useI18n } from './client'
import { Locale } from './constants'

const locales = {
    en: () => import('./constants/i18n/en.json'),
}

export async function getLanguages(locale: Locale) {
    const dictionary = await locales[locale]()
    const translate: ReturnType<typeof useI18n> = (key) => {
        let result: any = dictionary
        const keys = key.split('.')
        for (const key of keys) {
            if (typeof result !== 'object') {
                throw new Error(
                    `Invalid locale key "${key}". Not found in dictionary`,
                )
            }
            result = result[key]
        }
        if (typeof result !== 'string') {
            throw new Error(`Invalid locale key "${key}". Not found result`)
        }
        return result
    }
    return translate
}
