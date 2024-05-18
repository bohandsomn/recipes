import { GraphqlProvider, ServerGraphqlProvider } from '@/context'
import { LanguagesProvider, combineProviders } from '@/utils'

export const AppProvider = combineProviders([
    LanguagesProvider,
    ServerGraphqlProvider,
    GraphqlProvider,
])
