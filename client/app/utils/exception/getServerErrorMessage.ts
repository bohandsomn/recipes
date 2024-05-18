import { checkAuthError } from './checkAuthError'

export function getServerErrorMessage(data: unknown): string | null {
    const isServerError = checkAuthError(data)
    if (!isServerError) {
        return null
    }
    if (data.error.message) {
        return data.error.message
    } else {
        const keys = Object.keys(data.error)
        return keys.reduce(
            // @ts-ignore
            (acc, key) => `${acc}${key}: ${data.error[key].join(', ')}\n`,
            '',
        )
    }
}
