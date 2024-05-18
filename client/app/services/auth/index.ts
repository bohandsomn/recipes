import { AuthService } from './service'
import { authApi } from './config'

export * from './types'

/**
 * `server only`
 */
export const authService = new AuthService(authApi)
