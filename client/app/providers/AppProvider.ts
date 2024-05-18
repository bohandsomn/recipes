import { GraphqlProvider, ServerGraphqlProvider } from '@/context'
import { combineProviders } from '@/utils'

export const AppProvider = combineProviders([
    ServerGraphqlProvider,
    GraphqlProvider,
])
