import { GraphqlProvider, ServerGraphqlProvider } from '@/context'
import { NotificationProvider, combineProviders } from '@/utils'

export const AppProvider = combineProviders([
    NotificationProvider,
    ServerGraphqlProvider,
    GraphqlProvider,
])
