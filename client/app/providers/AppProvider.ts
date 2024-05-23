import { GraphqlProvider, ServerGraphqlProvider } from '@/context'
import { combineProviders } from '@/utils'
import { NotificationProvider } from '@/utils/notification'

export const AppProvider = combineProviders([
    NotificationProvider,
    ServerGraphqlProvider,
    GraphqlProvider,
])
