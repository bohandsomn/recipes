import createNextIntlPlugin from 'next-intl/plugin'
 
const withNextIntl = createNextIntlPlugin(
    './app/utils/languages/config.ts'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
            },
        ],
    },
}

export default withNextIntl(nextConfig)
