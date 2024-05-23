import { createHttpLink } from '@apollo/client'
import { configuration } from '@/config'

export const httpLink = createHttpLink({
    uri: configuration.graphQLServerUrl,
    credentials: 'include',
})
