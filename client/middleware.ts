import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './app/utils'

export default createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale
})

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
