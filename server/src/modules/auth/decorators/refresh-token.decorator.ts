import { Cookies } from '@/decorators/cookies.decorator'

import { REFRESH_TOKEN_COOKIE } from '../constants/refresh-token-cookie'

export const RefreshToken = () => Cookies(REFRESH_TOKEN_COOKIE)
