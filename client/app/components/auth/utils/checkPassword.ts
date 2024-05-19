import { MAX_PASSWORD, MIN_PASSWORD } from '../constants'

export function checkPassword(password: string): boolean {
    const passwordLength = password.length
    if (passwordLength > MAX_PASSWORD) {
        return false
    }
    if (passwordLength < MIN_PASSWORD) {
        return false
    }
    return true
}
