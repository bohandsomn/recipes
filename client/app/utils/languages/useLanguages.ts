import { useTranslations } from 'next-intl'
import { ITranslate } from './types'

export const useLanguages = (): ITranslate => {
    const translate = useTranslations()
    return translate
}
