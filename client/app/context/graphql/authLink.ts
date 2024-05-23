'use server'

import { setContext } from '@apollo/client/link/context'
import { cookies } from 'next/headers'

export const authLink = setContext((_, { headers }) => {
    const accessToken = cookies().get('accessToken')?.value
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
    }
})
