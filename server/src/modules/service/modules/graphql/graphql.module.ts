import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { Request, Response } from 'express'

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            context({ req, res }: { req: Request; res: Response }) {
                return { request: req, response: res }
            },
        }),
    ],
})
export class GraphqlModule {}
