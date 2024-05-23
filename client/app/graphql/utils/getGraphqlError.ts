import { ApolloError } from '@apollo/client'
import { IServerErrorDto } from '@/services'

export function getGraphqlError(error: ApolloError): IServerErrorDto {
    const serverError = error?.graphQLErrors?.[0]?.extensions
        ?.originalError as IServerErrorDto['error']
    return {
        error: serverError,
    }
}
