'use client'

import { ApolloLink } from '@apollo/client'
import {
    ApolloNextAppProvider,
    NextSSRApolloClient,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import React, { FC, PropsWithChildren } from 'react'
import { authLink } from './authLink'
import { httpLink } from './httpLink'

function makeClient() {
    const link = httpLink.concat(authLink)
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      link,
                  ])
                : link,
    })
}

export const ServerGraphqlProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}
