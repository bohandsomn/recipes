'use client'

import { ApolloProvider } from '@apollo/client'
import React, { FC, PropsWithChildren } from 'react'
import { client } from './client'

export const GraphqlProvider: FC<PropsWithChildren> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
