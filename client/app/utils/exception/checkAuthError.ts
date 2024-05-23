import { IServerErrorDto } from '@/services'

export function checkAuthError(data: unknown): data is IServerErrorDto {
    if (typeof data !== 'object' || data === null) {
        return false
    }
    const error = (data as Partial<IServerErrorDto>).error?.error
    if (typeof error === 'string') {
        return true
    }
    if (typeof error !== 'object' || error === null) {
        return false
    }
    const values = Object.values(error)
    const isEveryArray = values.every((value) => Array.isArray(value))
    return isEveryArray
}
