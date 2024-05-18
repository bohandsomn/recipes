import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { parseAcceptLanguage } from '@/utils'

const Page = () => {
    const acceptLanguage = headers().get('accept-language')
    const locale = parseAcceptLanguage(acceptLanguage)
    redirect(`/${locale}`)
}

export default Page
