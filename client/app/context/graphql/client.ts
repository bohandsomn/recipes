import { ApolloClient, InMemoryCache } from '@apollo/client'
import { httpLink } from './httpLink'

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})
