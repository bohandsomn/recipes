import { useMutation } from '@apollo/client'
import { CookieStorage } from 'cookie-storage'
import { IToggleRecipeInput } from '@/components'
import { IServerResponse } from '@/types'
import {
    ADD_RECIPE,
    GET_USER_RECIPE_PREVIEW,
    REMOVE_RECIPE,
} from '../constants'

export const useToggleRecipeMutation = (isWished: boolean) => {
    const mutation = isWished ? REMOVE_RECIPE : ADD_RECIPE
    const [mutate] = useMutation<void, IToggleRecipeInput>(mutation)
    const asyncMutation = async (
        input: IToggleRecipeInput,
    ): Promise<IServerResponse<void>> => {
        const accessToken = new CookieStorage().getItem('accessToken')
        const result: any = await mutate({
            variables: input,
            refetchQueries: [
                {
                    query: GET_USER_RECIPE_PREVIEW,
                    fetchPolicy: 'no-cache',
                    context: {
                        headers: {
                            authorization: `Bearer ${accessToken}`,
                        },
                    },
                },
            ],
            context: {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            },
        })
        let errorMessage: string | null
        if (result.errors) {
            errorMessage = result.errors.message
        } else {
            errorMessage = null
        }
        return {
            data: result.data ?? null,
            error: errorMessage,
        }
    }
    return asyncMutation
}
