import { cookies } from 'next/headers'
import { checkEmail, checkPassword, DEFAULT_EXPIRES, IGetRecipePreviewInput, IRecipe, IRecipeListPreview } from '@/components'
import { authService, IUserPayloadDto } from '@/services'
import { getServerErrorMessage } from '@/utils'
import { getLanguages } from '@/utils/languages'
import { getClient } from '@/context/graphql/getClient'
import { GET_RECIPE, GET_RECIPE_PREVIEW, GET_SIMILAR_RECIPE_PREVIEW, GET_USER_RECIPE_PREVIEW, SEARCH_RECIPE, getGraphqlError } from '@/graphql'
import { IServerResponse } from '@/types'

export async function registerUser(_prevState: unknown, formData: FormData): Promise<IServerResponse<IUserPayloadDto>> {
    'use server'
    try {
        const email = formData.get('email')?.toString() ?? ''
        const password = formData.get('password')?.toString() ?? ''
        const confirmPassword = formData.get('confirm-password')?.toString() ?? ''
        const translate = await getLanguages()
        const isEmail = checkEmail(email)
        const isValidPassword = checkPassword(password)
        if (!isEmail) {
            const errorMessage = translate('auth.validation.email')
            return {
                data: null,
                error: errorMessage
            }
        }
        if (!isValidPassword) {
            const errorMessage = translate('auth.validation.password')
            return {
                data: null,
                error: errorMessage
            }
        }
        if (password !== confirmPassword) {
            const errorMessage = translate('auth.validation.confirm-password')
            return {
                data: null,
                error: errorMessage
            }
        }
        const response = await authService.registerUser({
            email,
            password,
        })
        cookies().set('accessToken', response.accessToken, {
            expires: new Date(Date.now() + DEFAULT_EXPIRES * 1000)
        })
        cookies().set('refreshToken', response.refreshToken, {
            expires: new Date(Date.now() + DEFAULT_EXPIRES * 1000)
        })
        return {
            data: response,
            error: null
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function logInUser(_prevState: unknown, formData: FormData): Promise<IServerResponse<IUserPayloadDto>> {
    'use server'
    try {
        const email = formData.get('email')?.toString() ?? ''
        const password = formData.get('password')?.toString() ?? ''
        const translate = await getLanguages()
        const isEmail = checkEmail(email)
        const isValidPassword = checkPassword(password)
        if (!isEmail) {
            const errorMessage = translate('auth.validation.email')
            return {
                data: null,
                error: errorMessage
            }
        }
        if (!isValidPassword) {
            const errorMessage = translate('auth.validation.password')
            return {
                data: null,
                error: errorMessage
            }
        }
        const response = await authService.logInUser({
            email,
            password,
        })
        cookies().set('accessToken', response.accessToken, {
            expires: new Date(Date.now() + DEFAULT_EXPIRES * 1000)
        })
        cookies().set('refreshToken', response.refreshToken, {
            expires: new Date(Date.now() + DEFAULT_EXPIRES * 1000)
        })
        return {
            data: response,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function autoLogInUser(): Promise<IServerResponse<IUserPayloadDto>> {
    'use server'
    try {
        const response = await authService.autoLogInUser()
        return {
            data: response,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function logOutUser(): Promise<IServerResponse<void>> {
    'use server'
    try {
        const response = await authService.logOutUser()
        return {
            data: response,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function activateUser(activationLink: string): Promise<IServerResponse<void>> {
    'use server'
    try {
        const errorMessage = await authService.activateUser({
            activationLink
        })
        if (errorMessage) {
            return {
                data: null,
                error: errorMessage
            }
        }
        return {
            data: undefined,
            error: null
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function sendConfirmEmail(): Promise<IServerResponse<void>> {
    'use server'
    try {
        const response = await authService.sendConfirmEmail()
        return {
            data: response,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function setPassword(formData: FormData): Promise<IServerResponse<IUserPayloadDto>> {
    'use server'
    try {
        const password = formData.get('password')?.toString() ?? ''
        const translate = await getLanguages()
        const isValidPassword = checkPassword(password)
        if (!isValidPassword) {
            const errorMessage = translate('auth.validation.password')
            return {
                data: null,
                error: errorMessage
            }
        }
        const response = await authService.setPassword({
            password,
        })
        cookies().set('accessToken', response.accessToken, {
            expires: new Date(Date.now() + DEFAULT_EXPIRES * 1000)
        })
        cookies().set('refreshToken', response.refreshToken, {
            expires: new Date(Date.now() + DEFAULT_EXPIRES * 1000)
        })
        return {
            data: response,
            error: null,
        }
    } catch (error) {
        const errorMessage = getServerErrorMessage(error)!
        return {
            data: null,
            error: errorMessage
        }
    }
}

export async function getRecipePreview(input: IGetRecipePreviewInput): Promise<IServerResponse<IRecipeListPreview>> {
    const client = getClient()
    try {
        const { data } = await client.query({
            query: GET_RECIPE_PREVIEW,
            variables: input,
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

export async function getUserRecipePreview(): Promise<IServerResponse<IRecipeListPreview>> {
    const client = getClient()
    try {
        const accessToken = cookies().get('accessToken')?.value
        const { data } = await client.query({
            query: GET_USER_RECIPE_PREVIEW,
            context: {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
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
