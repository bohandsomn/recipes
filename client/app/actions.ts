import { IServerErrorDto, authService } from './services'

export async function registerUser(formData: FormData) {
    'use server'
    try {
        const email = formData.get('email')?.toString()!
        const password = formData.get('password')?.toString()!
        const confirmPassword = formData.get('confirm-password')?.toString()!
        if (password !== confirmPassword) {
            // TODO: Use i18n
            return {
                failure: 'Mismatched password'
            }
        }
        const response = await authService.registerUser({
            email,
            password,
        })
        return {
            success: response
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}

export async function logInUser(formData: FormData) {
    'use server'
    try {
        const email = formData.get('email')?.toString()!
        const password = formData.get('password')?.toString()!
        const response = await authService.logInUser({
            email,
            password,
        })
        return {
            success: response
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}

export async function autoLogInUser() {
    'use server'
    try {
        const response = await authService.autoLogInUser()
        return {
            success: response
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}

export async function logOutUser() {
    'use server'
    try {
        const response = await authService.logOutUser()
        return {
            success: response
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}

export async function activateUser(activationLink: string) {
    'use server'
    try {
        const errorMessage = await authService.activateUser({
            activationLink
        })
        if (errorMessage) {
            return {
                failure: errorMessage
            }
        }
        return {
            success: null
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}

export async function sendConfirmEmail() {
    'use server'
    try {
        const response = await authService.sendConfirmEmail()
        return {
            success: response
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}

export async function setPassword(formData: FormData) {
    'use server'
    try {
        const password = formData.get('password')?.toString()!
        const response = await authService.setPassword({
            password,
        })
        return {
            success: response
        }
    } catch (error) {
        return {
            failure: error as IServerErrorDto | null
        }
    }
}
