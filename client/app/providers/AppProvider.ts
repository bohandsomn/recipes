import { GraphqlProvider, ServerGraphqlProvider } from '@/context'
import { LanguagesProvider, NotificationProvider, combineProviders } from '@/utils'

export const AppProvider = combineProviders([
    LanguagesProvider,
    NotificationProvider,
    ServerGraphqlProvider,
    GraphqlProvider,
])
