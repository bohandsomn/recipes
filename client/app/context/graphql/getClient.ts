'server only'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { httpLink } from './httpLink'

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    })
})
