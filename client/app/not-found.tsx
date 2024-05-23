import { headers } from 'next/headers'
import Link from 'next/link'
import { Document } from '@/components'
import { getLanguages, parseAcceptLanguage } from '@/utils/languages'

const NotFoundPage = async () => {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    const translate = await getLanguages()
    const errorMessage = translate('common.not-found.errorMessage')
    const link = translate('common.not-found.link')
    return (
        <Document>
            <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
                <p className="text-4xl">404</p>
                <p>{errorMessage}</p>
                <Link locale={locale} href="/" className="underline">
                    {link}
                </Link>
            </div>
        </Document>
    )
}

export default NotFoundPage
