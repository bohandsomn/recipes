import { Environment } from '../constants/environment'

export interface IAppConfigService {
    get(environment: Environment): string
}
