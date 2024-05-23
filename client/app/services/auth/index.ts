import { authApi } from './config'
import { AuthService } from './service'

export * from './types'

/**
 * `server only`
 */
export const authService = new AuthService(authApi)
