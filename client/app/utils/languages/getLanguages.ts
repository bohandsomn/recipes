import { headers } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import { ITranslate } from './types'
import { parseAcceptLanguage } from './parseAcceptLanguage'

export async function getLanguages(): Promise<ITranslate> {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getTranslations({ locale })
    return translate
}
