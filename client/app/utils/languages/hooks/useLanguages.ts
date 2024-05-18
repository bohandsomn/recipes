import { useI18n } from '../client'
import { ITranslate } from '../types'

export const useLanguages = (): ITranslate => {
    const translate = useI18n()
    return translate
}
