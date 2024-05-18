import { headers } from 'next/headers'
import { checkEmail, checkPassword } from '@/auth'
import { authService } from '@/services'
import { getServerErrorMessage, parseAcceptLanguage } from '@/utils'
import { getLanguages } from '@/utils/languages/server'
import { IGetRecipePreviewInput, IRecipe, IRecipeListPreview } from '@/recipes'
import { getClient } from '@/context/graphql/getClient'
import { GET_RECIPE, GET_RECIPE_PREVIEW, GET_SIMILAR_RECIPE_PREVIEW, GET_USER_RECIPE_PREVIEW, SEARCH_RECIPE, getGraphqlError } from '@/graphql'
import { IServerResponse } from '@/types'

export async function registerUser(formData: FormData) {
    'use server'
    try {
        const email = formData.get('email')?.toString() ?? ''
        const password = formData.get('password')?.toString() ?? ''
        const confirmPassword = formData.get('confirm-password')?.toString() ?? ''
        const acceptLanguage = headers().get('accept-language')
        const locale = parseAcceptLanguage(acceptLanguage)
        const translate = await getLanguages(locale)
        const isEmail = checkEmail(email)
        const isValidPassword = checkPassword(password)
        if (!isEmail) {
            const errorMessage = translate('auth.validation.email')
            return {
                failure: errorMessage
            }
        }
        if (!isValidPassword) {
            const errorMessage = translate('auth.validation.password')
            return {
                failure: errorMessage
            }
        }
        if (password !== confirmPassword) {
            const errorMessage = translate('auth.validation.confirm-password')
            return {
                failure: errorMessage
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
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
        }
    }
}

export async function logInUser(formData: FormData) {
    'use server'
    try {
        const email = formData.get('email')?.toString() ?? ''
        const password = formData.get('password')?.toString() ?? ''
        const acceptLanguage = headers().get('accept-language')
        const locale = parseAcceptLanguage(acceptLanguage)
        const translate = await getLanguages(locale)
        const isEmail = checkEmail(email)
        const isValidPassword = checkPassword(password)
        if (!isEmail) {
            const errorMessage = translate('auth.validation.email')
            return {
                failure: errorMessage
            }
        }
        if (!isValidPassword) {
            const errorMessage = translate('auth.validation.password')
            return {
                failure: errorMessage
            }
        }
        const response = await authService.logInUser({
            email,
            password,
        })
        return {
            success: response
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
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
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
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
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
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
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
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
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
        }
    }
}

export async function setPassword(formData: FormData) {
    'use server'
    try {
        const password = formData.get('password')?.toString() ?? ''
        const acceptLanguage = headers().get('accept-language')
        const locale = parseAcceptLanguage(acceptLanguage)
        const translate = await getLanguages(locale)
        const isValidPassword = checkPassword(password)
        if (!isValidPassword) {
            const errorMessage = translate('auth.validation.password')
            return {
                failure: errorMessage
            }
        }
        const response = await authService.setPassword({
            password,
        })
        return {
            success: response
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)
        return {
            failure: errorMessage
        }
    }
}

export async function getRecipePreview(input: IGetRecipePreviewInput): Promise<IServerResponse<IRecipeListPreview>> {
    const client = getClient()
    try {
        const { data } = await client.query({
            query: GET_RECIPE_PREVIEW,
            variables: input
        })
        return {
            data: data.getRecipeList,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(getGraphqlError(error as any))!
        return {
            data: null,
            error: errorMessage,
        }
    }
}

export async function getRecipe(recipeCredentials: string): Promise<IServerResponse<IRecipe>> {
    const client = getClient()
    try {
        const { data } = await client.query({
            query: GET_RECIPE,
            variables: {
                recipeCredentials,
            }
        })
        return {
            data: data.getRecipe,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(getGraphqlError(error as any))!
        return {
            data: null,
            error: errorMessage,
        }
    }
}

export async function getSimilarRecipePreview(recipeCredentials: string): Promise<IServerResponse<IRecipeListPreview>> {
    const client = getClient()
    try {
        const { data } = await client.query({
            query: GET_SIMILAR_RECIPE_PREVIEW,
            variables: {
                recipeCredentials
            }
        })
        return {
            data: data.getSimilarRecipeList,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(getGraphqlError(error as any))!
        return {
            data: null,
            error: errorMessage,
        }
    }
}

export async function getUserRecipePreview(recipeCredentials: string): Promise<IServerResponse<IRecipeListPreview>> {
    const client = getClient()
    try {
        const { data } = await client.query({
            query: GET_USER_RECIPE_PREVIEW,
            variables: {
                recipeCredentials
            }
        })
        return {
            data: data.getUserRecipeList,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(getGraphqlError(error as any))!
        return {
            data: null,
            error: errorMessage,
        }
    }
}

export async function searchRecipe(query: string): Promise<IServerResponse<string[]>> {
    const client = getClient()
    try {
        const { data } = await client.query({
            query: SEARCH_RECIPE,
            variables: {
                query
            }
        })
        return {
            data: data.searchRecipe,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(getGraphqlError(error as any))!
        return {
            data: null,
            error: errorMessage,
        }
    }
}
