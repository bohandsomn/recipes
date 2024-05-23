import React, { FC, PropsWithChildren } from 'react'
import { AuthSection } from '@/components'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return <AuthSection>{children}</AuthSection>
}

export default AuthLayout
