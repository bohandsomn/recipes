import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'
import { parseAcceptLanguage } from './parseAcceptLanguage'
import { ITranslate } from './types'

export async function getLanguages(): Promise<ITranslate> {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getTranslations({ locale })
    return translate
}
