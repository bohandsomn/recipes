import { ExecutionContext } from '@nestjs/common'

import { IAppRequest } from '@/interfaces/app-request.interface'
import { GqlExecutionContext } from '@nestjs/graphql'

export function getRequest(context: ExecutionContext): IAppRequest {
    const httpRequest: IAppRequest | undefined = context
        .switchToHttp()
        .getRequest()
    if (httpRequest) {
        return httpRequest
    }
    const graphqlHttpRequest: IAppRequest =
        GqlExecutionContext.create(context).getContext().request
    return graphqlHttpRequest
}
